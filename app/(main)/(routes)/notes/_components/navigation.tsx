"use client"
import { ChevronLeft, ChevronRight, MenuIcon, PlusCircle, Search, Settings, ChevronDown, Plus } from "lucide-react"
import { useMutation, useQuery } from "convex/react"
import { ElementRef, useRef, useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useMediaQuery } from "usehooks-ts"
import { cn } from "@/lib/utils"
import { UserItem } from "./user-item"
import { Item } from "./item"
import { api } from "@/convex/_generated/api"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import { DocumentList } from "./document-list"
import { ModelToggleAside } from "./model-toggle-aside"
import { Button } from "@/components/ui/button"

export const Navigation = () => {
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isResizingRef = useRef(false)
  const sidebarRef = useRef<ElementRef<"aside">>(null)
  const navbarRef = useRef<ElementRef<"div">>(null)
  const [isResetting, setIsResetting] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(isMobile)
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault()
    event.stopPropagation()
    isResizingRef.current = true
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }
  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return
    let newWidth = event.clientX
    if (newWidth < 240) newWidth = 240
    if (newWidth > 480) newWidth = 480
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`
      navbarRef.current.style.setProperty("left", `${newWidth}px`)
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px`)
    }
  }
  const handleMouseUp = (event: MouseEvent) => {
    isResizingRef.current = false
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }
  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsResetting(true)
      setIsCollapsed(false)
      sidebarRef.current.style.width = isMobile ? "100%" : "240px"
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px")
      navbarRef.current.style.setProperty("width", isMobile ? "100%" : "calc(100% - 240px")
      setTimeout(() => {
        setIsResetting(false), 300
      })
    }
  }
  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      if (sidebarRef.current.style.width == "0px") {
        return resetWidth()
      }
      setIsCollapsed(true)
      setIsResetting(true)
      sidebarRef.current.style.width = "0"
      navbarRef.current.style.setProperty("width", "100%")
      navbarRef.current.style.setProperty("left", "0px")
      setTimeout(() => {
        setIsResetting(false), 300
      })
    }
  }
  useEffect(() => {
    if (isMobile) {
      collapse()
    } else {
      resetWidth()
    }
    /* trunk-ignore(eslint/react-hooks/exhaustive-deps) */
  }, [isMobile])
  /* Datas */
  const createNote = useMutation(api.documents.create)
  const handleCreate = () => {
    const promise = createNote({
      title: "Untitled",
    })
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "Note created",
      error: "Error creating note",
    })
  }
  return (
    <>
      <aside ref={sidebarRef} className={cn("group/sidebar h-full bg-primary/5 overflow-y-auto relative flex w-60 flex-col z-[999]", isResetting && "transition-all ease-in-out duration-300", isMobile && "w-0")}>
        <div role="button"
          onClick={collapse}
          className={cn("h-8 w-8 absolute top-3 right-2 opacity-0 justify-center flex items-center text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 group-hover/sidebar:opacity-100",
            isMobile && "opacity-100")}>
          <ChevronLeft className="cursor-pointer" />
        </div>
        <div>
          <UserItem />
          <Item
            label="Search"
            icon={Search}
            isSearch
            onClick={() => {
            }}
          />
          <Item
            label="New Note"
            onClick={handleCreate}
            icon={Plus}
            isNew />
        </div>
        <Separator />
        <DocumentList />
        <ModelToggleAside />
        <div onMouseDown={handleMouseDown} onClick={resetWidth} className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"></div>
      </aside>
      <div ref={navbarRef} onClick={collapse} className={cn("absolute top-0 left-60 w-[calc(100%-240px)]", isResetting && "transition-all ease-in-out duration-300", isMobile && "left-0 w-full")}>
        <nav className="bg-transparent px-3 py-2 w-full">{isCollapsed && <MenuIcon role="button" className="cursor-pointer h-6 w-6 text-muted-foreground" />}</nav>
      </div>

    </>
  )
}

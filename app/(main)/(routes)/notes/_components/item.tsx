"use client"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { useMutation } from "convex/react"
import { ChevronDown, ChevronUp, DeleteIcon, Divide, Ellipsis, LucideIcon, MoreHorizontal, Package, Plus, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { useUser } from "@clerk/clerk-react"
import { AlertDialogDelete } from "./alert-delete-confim"

interface ItemProps {
  id?: Id<"documents">
  documentIcon?: string
  active?: boolean
  expanded?: boolean
  onExpand?: () => void
  level?: number
  isSearch?: boolean
  isNew?: boolean
  label: string
  onClick: () => void
  icon: LucideIcon
}

export const Item = ({ label, onClick, icon: Icon, id, active, documentIcon, level = 0, isSearch, isNew, expanded, onExpand }: ItemProps) => {
  const ChevronIcon = expanded ? ChevronUp : ChevronDown
  const router = useRouter();
  const { user } = useUser();

  const handleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    onExpand?.()
  }

  const create = useMutation(api.documents.create);
  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return

    const promise = create({ title: "Untitled", parentDocument: id }).then((documentId) => {
      if (!expanded) onExpand?.()
      // router.push(`/notes/${documentId}`)
    })

    toast.promise(promise, {
      loading: 'Creating...',
      success: 'Created!',
      error: 'Failed to create'
    })
  }

  const archive = useMutation(api.documents.archive);
  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return
    const promise = archive({ id: id })

    toast.promise(promise, {
      loading: 'Archiving...',
      success: 'Archived!',
      error: 'Failed to archive'
    })
  }

  return (
    <div role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      onClick={onClick}
      className={cn("group w-full flex flex-row gap-x-2 items-center font-medium p-2 hover:bg-primary/5 cursor-pointer", active && "bg-primary/10 text-primary")}>
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
          onClick={handleExpand}>
          <ChevronIcon
            className="w-6 h-6 shrink-0 text-muted-foreground/50" />
        </div>)}
      {documentIcon ?
        (
          <div>
            {documentIcon}
          </div>
        ) :
        (
          <Icon className="w-6 h-6 shrink-0 text-muted-foreground" />
        )}
      <span className="text-sm text-muted-foreground truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">
            ⌘
          </span>
          K
        </kbd>
      )}
      {isNew && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">
            ⌘
          </span>
          N
        </kbd>
      )}
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2 ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(event) => event.stopPropagation()}>
              <div role="button" className="opacity-0 p-1 group-hover:opacity-100 transition h-full rounded-sm bg-neutral-300 dark:bg-neutral-800  hover:bg-neutral-400 dark:hover:bg-neutral-600">
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={onArchive}>
                <Package className="w-4 h-4 text-muted-foreground" />
                <span className="ml-2">Archive</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(event) => event.stopPropagation()} className="text-destructive">
                <AlertDialogDelete documentId={id} />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(event) => event.stopPropagation()}>
                <span className="ml-2">Last edited by: {user?.fullName}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div role="button" onClick={onCreate} className="opacity-0 p-1 group-hover:opacity-100 transition h-full rounded-sm bg-neutral-300 dark:bg-neutral-800 hover:bg-neutral-400 dark:hover:bg-neutral-600">
            <Plus className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

      )}
    </div>
  )
}

Item.Skeleton = function ItemSkeleton(
  { level }: { level?: number }
) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className="flex flex-row gap-x-2 py-3">
      <Skeleton className="w-4 h-4 bg-primary/10" />
      <Skeleton className="w-[60%] bg-primary/10" />
    </div>
  )
}

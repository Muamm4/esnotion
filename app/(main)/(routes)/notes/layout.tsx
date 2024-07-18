"use client"
import { useConvexAuth } from "convex/react"
import { Spinner } from "@/components/spinner"
import * as React from "react"
import { redirect } from "next/navigation"
import { Navigation } from "./_components/navigation"
import Loading from "./_components/loading-div"
import { cn } from "@/lib/utils"

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuthenticated } = useConvexAuth()

  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setIsVisible(true);
      }, 100);
    }
  }, [isLoading]);
  if (isLoading) {
    return (
      <>
        <div className="flex justify-center items-center w-full h-full">
          <Loading />
        </div>
      </>
    )
  }
  if (!isAuthenticated && !isLoading) {
    return redirect("/")
  }

  if (isAuthenticated) {

    return (
      <>
        {!isLoading && (
          <div className={cn("w-full h-full flex ", { "opacity-0 ": !isVisible, "transition-all duration-300 opacity-100": isVisible })}>
            <Navigation />
            <main className="h-full flex-1 overflow-y-auto">{children}</main>
          </div>
        )}
      </>
    )
  }
}

export default DashBoardLayout

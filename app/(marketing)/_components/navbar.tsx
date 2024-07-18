"use client"

import {ModeToggle} from "@/components/modetoggle"
import {Button} from "@/components/ui/button"
import {SignIn, SignInButton, UserButton} from "@clerk/clerk-react"
import {useScrollTop} from "@/hooks/use-scroll-top"
import {cn} from "@/lib/utils"
import Logo from "./logo"
import {useConvexAuth} from "convex/react"
import Spinner from "@/components/spinner"
import Link from "next/link"

const Navbar = () => {
  const {isAuthenticated, isLoading} = useConvexAuth()
  const scrolled = useScrollTop()
  return (
    <div className={cn("z-50 bg-background fixed top-0 gap-x-4 flex justify-between items-center w-full p-6", scrolled && "shadow-sm border-b")}>
      <Logo />
      <div className="flex justify-end gap-x-4 items-center w-full">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal" fallbackRedirectUrl={"/notes"}>
              <Button variant="ghost">Sign in</Button>
            </SignInButton>
            <SignInButton mode="modal" fallbackRedirectUrl={"/notes"}>
              <Button>Aya free account</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && (
          <>
            <Button>
              <Link href="/notes">Enter Aya</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  )
}

export default Navbar

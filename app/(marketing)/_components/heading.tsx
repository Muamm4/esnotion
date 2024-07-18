"use client"

import {Button} from "@/components/ui/button"
import {ArrowRight} from "lucide-react"
import {useConvexAuth} from "convex/react"
import {SignInButton} from "@clerk/clerk-react"
import Link from "next/link"

export const Heading = () => {
  const {isLoading, isAuthenticated} = useConvexAuth()
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl md:text-5xl font-bold">
        Welcome to your new Notation App <span className="underline decoration-sky-500">Aya</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl">
        Aya is connect workspace where
        <br />
        you can store and share your notes
      </h3>

      {isLoading && (
        <>
          <Button>
            Get Started <ArrowRight className="h-4 w-4 ml-2 " />
          </Button>
        </>
      )}
      {!isAuthenticated && !isLoading && (
        <>
          <SignInButton mode="modal" fallbackRedirectUrl={"/notes"}>
            <Button>
              Get Started <ArrowRight className="h-4 w-4 ml-2 " />
            </Button>
          </SignInButton>
        </>
      )}
      {isAuthenticated && (
        <>
          <Button>
            <Link href="/notes">Enter EsNotion</Link>
          </Button>
        </>
      )}
    </div>
  )
}

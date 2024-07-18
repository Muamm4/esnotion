"use client"

import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import { PlusCircle } from "lucide-react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"

const DashBoardNotes = () => {
  const { user } = useUser()
  const createNote = useMutation(api.documents.create)
  const onCreate = () => {
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
    <div className="flex flex-col justify-center items-center h-full gap-y-2">
      <p className="text-lg">Get started by creating a new note.</p>
      <h2>Welcome to {user?.firstName}&apos;s Aya</h2>
      <Button>
        <div className="flex justify-center items-center gap-x-2" onClick={onCreate}>
          <span>Create New Note</span> <PlusCircle className="h-6 w-6" />
        </div>
      </Button>
    </div>
  )
}
export default DashBoardNotes
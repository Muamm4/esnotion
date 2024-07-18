"use client"
import { Id } from "@/convex/_generated/dataModel"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { toast } from "sonner"
import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"

interface AlertDialogDeleteProps {
    documentId: Id<"documents">
}

export const AlertDialogDelete = ({ documentId }: AlertDialogDeleteProps) => {
    const deleteDocument = useMutation(api.documents.deleteDoc);
    const onDelete = () => {
        const promise = deleteDocument({ id: documentId })
        toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Deleted!',
            error: 'Failed to delete'
        })
    }
    return (
        <AlertDialog >
            <AlertDialogTrigger asChild>
                <div role="button" onClick={(event) => event.stopPropagation()} className="flex w-full">
                    <Trash className="w-4 h-4" />
                    <span className="ml-2">Delete</span>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="z-[9999999]" onClick={(event) => { event.stopPropagation() }}>
                <AlertDialogHeader >
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter >
                    <AlertDialogCancel onClick={(event) => { event.stopPropagation() }}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
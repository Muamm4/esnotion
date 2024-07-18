"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Skeleton } from "@/components/ui/skeleton"
import { Item } from "./item"
import { cn } from "@/lib/utils"
import { FileIcon } from "lucide-react"
interface DocumentListProps {
    parentDocument?: Id<"documents">
    title?: string
    level?: number
    data?: Doc<"documents">
}

export const DocumentList = ({ parentDocument, level = 0 }: DocumentListProps) => {
    const params = useParams();
    const router = useRouter();
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const onExpand = (DocumentId: string) => {
        setExpanded((prev) => ({ ...prev, [DocumentId]: !prev[DocumentId] }));
    }

    const documents = useQuery(api.documents.getSiderbarDocuments, {
        parentDocument: parentDocument

    })

    const onRedirect = (_id: string) => {
        router.push(`/notes/${_id}`)
    }
    if (documents == undefined) {
        return (
            <>
                <Item.Skeleton level={level} />
                {level == 0 &&
                    (
                        <>
                            <Item.Skeleton level={level} />
                            <Item.Skeleton level={level} />
                        </>
                    )
                }
            </>
        )
    }
    return (
        <>
            <p
                style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
                className={cn("gap-x-2 py-3 hidden text-sm font-medium text-muted-foreground", expanded && "last:block",
                    level == 0 && "hidden",
                )}>No notes inside</p>
            {documents.map((document) => (
                <div key={document._id}>
                    <Item
                        id={document._id}
                        documentIcon={document.icon}
                        active={params.documentId == document._id}
                        expanded={expanded[document._id]}
                        onExpand={() => onExpand(document._id)}
                        level={level}
                        label={document.title}
                        onClick={() => onRedirect(document._id)}
                        icon={FileIcon}
                    />
                    {expanded[document._id] && (<DocumentList parentDocument={document._id} level={level + 1} />)}
                </div>

            ))}

        </>

    )
}
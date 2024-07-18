"use client"

import { ChevronsLeftRight, ChevronsRightLeft, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SignOutButton, useUser } from "@clerk/nextjs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Item } from "./item"
export const UserItem = () => {
  const { user } = useUser()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div role="button" className="flex items-center text-sm p-3 w-full hover:bg-primary/5">
          <div className="flex items-center gap-x-2 max-w-[150px]">
            <Avatar className="w-8 h-8 rounded-sm">
              <AvatarImage className="rounded-none" src={user?.imageUrl} />
              {user?.firstName && user?.lastName && (
                <AvatarFallback>
                  {user?.firstName[0]}
                  {user?.lastName[0]}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="truncate">{user?.firstName}&apos;Aya</div>
          </div>
          <ChevronsLeftRight className="cursor-pointer rotate-90 ml-2 text-muted-foreground h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full rounded-md" align="start" alignOffset={11} forceMount>
        <DropdownMenuLabel>
          <p className="text-sm my-2 font-medium leading-none text-muted-foreground">{user?.emailAddresses[0].emailAddress}</p>
          <div className="flex p-2 gap-x-2 items-center w-full">
            <Avatar className="w-8 h-8 rounded-sm">
              <AvatarImage className="rounded-none" src={user?.imageUrl} />
              {user?.firstName && user?.lastName && (
                <AvatarFallback>
                  {user?.firstName[0]}
                  {user?.lastName[0]}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <p className="text-sm font-normal">{user?.firstName}&apos;Aya Workspace</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem >
          <Item
            label="Settings"
            icon={Settings}
            onClick={() => {
            }}
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex p-2 gap-x-2 text-sm text-muted-foreground items-center w-full">
          <SignOutButton>Sign out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

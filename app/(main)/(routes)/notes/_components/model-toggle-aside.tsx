
"use client";

import * as React from "react";
import { Computer, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ModelToggleAside = () => {
    const { setTheme } = useTheme();
    return (
        <div className="w-full rounded-none text-left bg-primary absolute bottom-0">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="w-full ">
                        <Sun className="h-[1.2rem] w-[1.2rem] mr-2 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:hidden" />
                        <Moon className="h-[1.2rem] w-[1.2rem] mr-2 rotate-90 scale-0 transition-all hidden dark:rotate-0 dark:scale-100 dark:block" />
                        <span className="">Theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 mr-2 dark:scale-100" /> Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                        <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all mr-2 dark:scale-100" /> Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                        <Computer className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all  mr-2 dark:scale-100" /> System
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );

}
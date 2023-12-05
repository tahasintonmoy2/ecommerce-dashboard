"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Laptop2, LogOut, Moon, Sun, User2 } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { SignOutButton, useUser, useClerk } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

const UserProfileButton = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [position, setPosition] = useState("system");
  const { setTheme } = useTheme();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center text-sm pl-12 pr-4 md:pr-2 md:pl-2">
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <Avatar className="h-9 w-9 cursor-pointer">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-90 dark:bg-[#0f111a]"
        align="end"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <p className="text-xs ml-3 font-medium leading-none text-muted-foreground">
              {user?.fullName}
            </p>
          </div>
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {user?.emailAddresses[0].emailAddress}
          </p>
        </div>
        <DropdownMenuSeparator className="border border-b" />
        <DropdownMenuItem className="w-full flex text-muted-foreground dark:text-white justify-start focus-visible:ring-transparent focus:outline-none">
          <User2 className="h-5 w-5 mr-2" />
          Profile
          <DropdownMenuShortcut>⇧P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="my-2 text-muted-foreground dark:text-white">
            <Moon className="h-5 w-5 mr-2" />
            <span>Appearance</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="dark:bg-[#0f111a]">
              <div>
                <p className="pl-2 text-muted-foreground">
                  Appearance
                </p>
                <p className="text-[0.9rem] dark-txt px-2 py-0.5 text-slate-500">
                  Setting applies to this browser only
                </p>
              </div>
              <hr className="my-2" />
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                <DropdownMenuRadioItem value="system" onClick={() => setTheme("system")}>
                  Use device theme
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark" onClick={() => setTheme("dark")}>
                  Dark theme
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="light" onClick={() => setTheme("light")}>
                  Light theme
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem className="w-full py-0 px-0 flex text-muted-foreground dark:text-white justify-start focus-visible:ring-transparent focus:outline-none">
          <SignOutButton>
            <Button
              onClick={() => signOut(() => router.push("/"))}
              variant="ghost"
              size="sm"
              className="cursor-default w-full flex items-center justify-start"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileButton;

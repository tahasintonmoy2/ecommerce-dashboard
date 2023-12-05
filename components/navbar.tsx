import { UserButton, auth } from "@clerk/nextjs";
import React from "react";
import { MainNav } from "@/components/main-nav";
import { StoreSwitcher } from "./store-switcher";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import UserProfileButton from "./user-profile-button";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await db.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="mr-4 hidden">
          <Button variant="ghost" size='icon'>
            <MenuIcon />
          </Button>
        </div>
        <StoreSwitcher items={stores} className="text-slate-700" />
        <MainNav className="mx-6 md:block hidden" />
        <div className="ml-auto flex items-center space-x-4">
          <UserProfileButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

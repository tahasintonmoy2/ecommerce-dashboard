"use client";

import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  ShoppingBagIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { Store } from "@prisma/client";
import { useState, useEffect } from "react";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

export const StoreSwitcher = ({
  className,
  items = [],
}: StoreSwitcherProps) => {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const [isOpen, setIsOpen] = useState(false);

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const onSelectedStore = (store: { value: string; label: string }) => {
    setIsOpen(false);
    router.push(`/${store.value}`);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button
          variant="outline"
          role="combobox"
          size="sm"
          aria-expanded={isOpen}
          aria-label="Select a store"
          className={cn("w-[200px] dark:hover:bg-slate-600/30 justify-between dark:bg-[#0f111a]", className)}
        >
          <Avatar className="mr-2 h-5 w-5">
            <AvatarImage
              src={`https://avatar.vercel.sh/${currentStore?.value}.png`}
              alt={""}
            />
            <AvatarFallback className="flex items-center">
              <ShoppingBagIcon className="mr-2 h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div className="truncate dark:text-white">
            {currentStore?.label}
          </div>
          <ChevronsUpDown className="ml-auto h-4 w-4 dark:text-gray-400 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 dark:bg-[#0f111a]">
        <Command className="dark:bg-[#0f111a]">
          <CommandInput placeholder="Search store..." className="dark:bg-[#0f111a]"/>
          <CommandList>
            <CommandEmpty>No stores found.</CommandEmpty>
            <CommandGroup heading="Current Store">
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onSelectedStore(store)}
                >
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${store.value}.png`}
                      alt={""}
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div className="truncate">
                    {store.label}
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="New Store">
              <CommandItem
                onSelect={() => {
                  setIsOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4 text-slate-600" />
                Create new store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

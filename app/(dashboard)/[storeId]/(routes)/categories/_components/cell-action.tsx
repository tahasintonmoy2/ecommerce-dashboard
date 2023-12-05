"use client";
import React, {useState} from "react";
import { CategoryColumn } from "./columns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { AlertDialogModal } from "@/components/models/alert-dialog-modal";

interface CellActionProps {
  data: CategoryColumn;
}

const CellAction: React.FC<CellActionProps> = ({
 data 
}) => {
    const router = useRouter()
    const params = useParams()

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id),
        toast.success("Category ID Copy to clipboard")
    }

    const onDelete = async () => {
        try {
          setIsLoading(true);
          await axios.delete(`/api/${params.storeId}/categories/${data.id}`);
          toast.success("Category deleted");
          router.refresh();
        } catch (error) {
          toast.error("Make sure you removed all products and categories with this category first.");
        } finally {
          setIsLoading(false);
          setIsOpen(false);
        }
      };
    
  return (
    <>
     <AlertDialogModal
        isOpen={isOpen}
        onClose={()=> setIsOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
     />
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0 dark:bg-transparent dark:border-none dark:hover:bg-slate-800" variant='ghost'>
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4"/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Action</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=> onCopy(data.id)}>
                <Copy className="mr-2 h-4 w-4"/>
                Copy Id
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=> router.push(`/${params.storeId}/categories/${data.id}`)}>
                <Edit className="mr-2 h-4 w-4"/>
                Update
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=> setIsOpen(true)}>
                <Trash className="mr-2 h-4 w-4"/>
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    </>
  );
};

export default CellAction;

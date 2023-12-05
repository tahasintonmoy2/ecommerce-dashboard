"use client";

import React, { useState, useEffect } from "react";
import { Billboard } from "@prisma/client";
import * as z from "zod";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { AlertDialogModal } from "@/components/models/alert-dialog-modal";
import ImageUpload from "@/components/ui/image-upload";

interface BillboardFormProps {
  initialData: Billboard | null;
}

const formSchema = z.object({
  label: z.string().min(4),
  imageURL: z.string().min(4),
});

type BillboardFormValues = z.infer<typeof formSchema>;

export const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const params = useParams();

  const title = initialData ? "Edit Billboard" : "Create new billboard";
  const description = initialData ? "Edit Billboard" : "Add new billboard";
  const toastMessage = initialData ? "Billboard update" : "Billboard created";
  const action = initialData ? "Save & Change" : "Create";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageURL: "",
    },
  });

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setIsLoading(true);
      if (initialData) {
        axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        );
      } else {
        axios.post(`/api/${params.storeId}/billboards`, data);
      }
      router.push(`/${params.storeId}/billboards`);
      toast.success(toastMessage);
      router.refresh();
    } catch (error) {
      toast.error(`Something went wrong...error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`
      );
      router.push(`/${params.storeId}/billboards`);
      toast.success("Billboard deleted");
      router.refresh();
    } catch (error) {
      toast.error(
        "Make sure you removed all products and categories with this billboard first."
      );
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AlertDialogModal
        isOpen={isOpen}
        onConfirm={onDelete}
        onClose={() => setIsOpen(false)}
        loading={isLoading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            size="icon"
            disabled={isLoading}
            variant="destructive"
            onClick={() => setIsOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator className="my-3" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            name="imageURL"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billboard Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disable={isLoading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <FormField
              name="label"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Billboard Name"
                      disabled={isLoading}
                      className="focus-visible:ring-transparent focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} type="submit" className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

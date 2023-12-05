"use client";

import React, { useState, useEffect } from "react";
import { Color } from "@prisma/client";
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

interface ColorFormProps {
  initialData: Color | null;
}

const formSchema = z.object({
  name: z.string().min(2),
  value: z.string().min(4).regex(/^#/, {
    message: "Color must be a valid hex code",
  }),
});

type ColorFormValues = z.infer<typeof formSchema>;

export const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const params = useParams();

  const title = initialData ? "Edit Color" : "Create new Color";
  const description = initialData ? "Edit Color" : "Add new Color";
  const toastMessage = initialData ? "Color update" : "Color created";
  const action = initialData ? "Save & Change" : "Create";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: ColorFormValues) => {
    try {
      setIsLoading(true);
      if (initialData) {
        axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data);
      } else {
        axios.post(`/api/${params.storeId}/colors`, data);
      }
      router.push(`/${params.storeId}/colors`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      toast.error(`Something went wrong...error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      router.push(`/${params.storeId}/colors`);
      router.refresh();
      toast.success("Color deleted");
    } catch (error) {
      toast.error("Make sure you removed all products with this Color first.");
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      disabled={isLoading}
                      className="focus-visible:ring-transparent focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="value"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        placeholder="Color value"
                        disabled={isLoading}
                        className="focus-visible:ring-transparent focus:outline-none"
                        {...field}
                      />
                      <div
                        className="border p-4 rounded-full"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
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

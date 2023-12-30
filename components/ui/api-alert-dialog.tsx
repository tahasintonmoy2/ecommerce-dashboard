"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Server } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface ApiAlertDialogProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertDialogProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<
  ApiAlertDialogProps["variant"],
  BadgeProps["variant"]
> = {
  public: "secondary",
  admin: "delete",
};

export const ApiAlertDialog: React.FC<ApiAlertDialogProps> = ({
  title,
  description,
  variant,
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("API Route Copied!");
  };

  return (
    <Alert className="dark:hover:bg-slate-700/30 dark:bg-slate-800/30">
      <Server className="h-5 w-5" />
      <AlertTitle>
        {title}
        <Badge className="ml-2" variant={variantMap[variant]}>
          {textMap[variant]}
        </Badge>
      </AlertTitle>
      <AlertDescription className="flex items-center justify-between mt-4">
        <code className="relative truncate rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant="outline" size="sm" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";
import { Size } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { SizeColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface SizesClientProps {
  data: SizeColumn[];
}

export const SizesClient: React.FC<SizesClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Mange Sizes for your store"
        />
        <Button
          onClick={() =>
            router.push(`/${params.storeId}/sizes/new`)
          }
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name"/>
      <Heading 
        title="API"
        description="API call for Sizes"
      />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId"/>
    </>
  );
};

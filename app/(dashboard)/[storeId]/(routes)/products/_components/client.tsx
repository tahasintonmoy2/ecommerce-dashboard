"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ProductColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface ProductClientProps {
  data: ProductColumn[];
}

const ProductClient: React.FC<ProductClientProps> = ({ 
  data 
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Mange Products for your store"
        />
        <Button
          onClick={() =>
            router.push(`/${params.storeId}/products/new`)
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
        description="API call for Products"
      />
      <Separator />
      <ApiList entityName="products" entityIdName="productId"/>
    </>
  );
};

export default ProductClient;

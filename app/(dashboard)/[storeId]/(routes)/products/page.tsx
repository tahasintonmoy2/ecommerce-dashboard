import React from "react";
import ProductClient from "./_components/client";
import { db } from "@/lib/db";
import { ProductColumn } from "./_components/columns";
import { format } from "date-fns";
import { formatPrice } from "@/lib/utils";

const Products = async ({ 
  params
}: {
  params: { storeId: string }
}) => {
  const products = await db.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProduct: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatPrice(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProduct} />
      </div>
    </div>
  );
};

export default Products;

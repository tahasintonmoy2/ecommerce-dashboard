import React from "react";
import {ColorsClient} from "./_components/client";
import { db } from "@/lib/db";
import { ColorColumn } from "./_components/columns";
import {format} from 'date-fns';

const Colors = async({
  params
}: {
  params: { storeId: string }
}) => {
  const colors = await db.color.findMany({
    where:{
      storeId: params.storeId
    },
    orderBy:{
      createdAt:'desc'
    }
  })

  const formattedColors:ColorColumn[] = colors.map((item)=> ({
    id: item.id,
    name: item.name,
    value: item.value,
    createAt: format(item.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsClient data={formattedColors}/>
      </div>
    </div>
  );
};

export default Colors;

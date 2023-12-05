"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export type BillboardColumn = {
  id: string
  label: string
  createAt: string
}

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Name",
  },
  {
    accessorKey: "createAt",
    header: "Date",
  },
  {
    id: "action",
    cell:({row}) => <CellAction data={row.original}/>,
  },
]
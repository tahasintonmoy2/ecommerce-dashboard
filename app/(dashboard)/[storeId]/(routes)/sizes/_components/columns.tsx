"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export type SizeColumn = {
  id: string
  name: string
  value: string
  createAt: string
}

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Sizes",
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
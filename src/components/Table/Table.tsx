 

import {
  CellContext,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"


import { Input } from "../ui/input";
import { CSSProperties, useState } from 'react';
import { Button } from "../ui/button"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Icon } from "@iconify/react/dist/iconify.js"

export interface ColumnProps<TData> {
  accessorKey: keyof TData,
  header:string,
  filter?:boolean,
  body?: (row:TData) => React.ReactNode
}

interface DataTableProps<TData, TValue> {
  columns: ColumnProps<TData>[]
  data: TData[]
  onAdd?: () => void
  onEdit?: (item:TData)=> void
  onDelete?: (item:TData) => void,
  onView?:(item:TData) => void,
  className?: string
  style?: CSSProperties
}

export interface Cell<TData,TValue = unknown> extends CellContext<TData,TValue> {
}



export function DataTable<TData, TValue>({
  columns,
  data,
  onAdd,
  onDelete,
  onEdit,
  onView,
  className = "",
  style
}: Readonly<DataTableProps<TData, TValue>>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns: columns.map(({accessorKey, header, body = r => r[accessorKey]}):ColumnDef<TData,TValue>=>{
      return {accessorKey, header, cell: ({row}) => body?.(row.original)}
    }),
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state:{
      columnFilters,
    }
  })

  

  return (
    <div className={`rounded-md border ${className}`} style={style}>
      {columns.some(c => c.filter) && <div className="flex items-center py-4">
        {columns.map((column)=>
          column.filter ? <Input
            key={column.accessorKey.toString()}
            placeholder={`Filter ${column.header}s...`}
            value={(table.getColumn(column.accessorKey.toString())?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(column.accessorKey.toString())?.setFilterValue(event.target.value)
            }
            className="max-w-sm mx-5"
          /> : null
        )}
      </div>}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
              {onAdd && <TableCell><Icon icon={'material-symbols:add-circle'} onClick={()=> onAdd()} className='w-7 h-7 p-1 rounded transition-all hover:text-blue-300 hover:bg-blue-50/10 cursor-pointer' /></TableCell>}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                {onView && <TableCell><Icon icon={'uil:eye'} onClick={()=> onView(row.original)} className='w-7 h-7 p-1 rounded transition-all hover:text-blue-300 hover:bg-blue-50/10 cursor-pointer' /></TableCell>}
                {onEdit && <TableCell><Icon icon={'material-symbols:edit'} onClick={()=> onEdit(row.original)} className='w-7 h-7 p-1 rounded transition-all hover:text-blue-300 hover:bg-blue-50/10 cursor-pointer' /></TableCell>}
                {onDelete && <TableCell><Icon icon={'mdi:trash'} onClick={()=> onDelete(row.original)} className='w-7 h-7 p-1 rounded transition-all hover:text-blue-300 hover:bg-blue-50/10 cursor-pointer' /></TableCell>}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 mx-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

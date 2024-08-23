 

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
import { CSSProperties, forwardRef, Ref, useEffect, useImperativeHandle, useState } from 'react';
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
import Spinner from "../Spinner/Spinner";

export interface ColumnProps<TData> {
  accessorKey: keyof TData,
  header:string,
  filter?:boolean,
  body?: (row:TData) => React.ReactNode,
  style?: React.CSSProperties
}

export interface DataTableProps<TData> {
  columns: ColumnProps<TData>[]
  data: TData[]
  onAdd?: () => void
  onEdit?: (item:TData)=> void
  editWhen?: (item: TData) => boolean
  onDelete?: (item:TData) => void,  
  deleteWhen?: (item: TData) => boolean
  onView?:(item:TData) => void,
  viewWhen?: (item: TData) => boolean
  onGlobalFilter?:(globalFilter:string) => void
  onFilter?: (columns:ColumnFiltersState) => void
  className?: string
  pagination?:boolean
  style?: CSSProperties
  loading?:boolean
}

export interface Cell<TData,TValue = unknown> extends CellContext<TData,TValue> {
}

export type DataTableRef = {
  isNextPage: () => boolean
};

function DataTableInner<TData>({ columns, data, onAdd, onDelete, deleteWhen = () => true, onEdit, editWhen = () => true, onView, viewWhen = () => true, className = "", style, pagination, onFilter, onGlobalFilter, loading }:DataTableProps<TData>, ref:Ref<DataTableRef>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [globalFilterValue, setGlobalFilterValue] = useState("")

  const table = useReactTable({
    data,
    columns: columns.map(({accessorKey, header, body = r => r[accessorKey]}):ColumnDef<TData>=>{
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

  useEffect(()=>{
    onFilter?.(table.getState().columnFilters)
  },[JSON.stringify(table.getState().columnFilters)])

  useImperativeHandle(ref, () => ({
    isNextPage: table.getCanNextPage
  }));

  return (
    <div className={`rounded-md border ${className}`} style={style}>
      {(columns.some(c => c.filter) || onGlobalFilter) && <div className="flex items-center py-4">
        {onGlobalFilter && <Input
          placeholder="Buscar"
          value={globalFilterValue}
          className="mx-4"
          onChange={e=>{
            onGlobalFilter(e.target.value)
            setGlobalFilterValue(e.target.value)
          }}
        />}
        {columns.map((column)=>
          column.filter ? <Input
            key={column.accessorKey.toString()}
            placeholder={`${column.header}`}
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
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                {onView && viewWhen(row.original) && <TableCell><Icon icon={'uil:eye'} onClick={()=> onView(row.original)} className='w-7 h-7 p-1 rounded transition-all hover:text-blue-300 hover:bg-blue-50/10 cursor-pointer' /></TableCell>}
                {onEdit && editWhen(row.original) && <TableCell><Icon icon={'material-symbols:edit'} onClick={()=> onEdit(row.original)} className='w-7 h-7 p-1 rounded transition-all hover:text-blue-300 hover:bg-blue-50/10 cursor-pointer' /></TableCell>}
                {onDelete && deleteWhen(row.original) && <TableCell><Icon icon={'mdi:trash'} onClick={()=> onDelete(row.original)} className='w-7 h-7 p-1 rounded transition-all hover:text-blue-300 hover:bg-blue-50/10 cursor-pointer' /></TableCell>}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {loading?  <Spinner/>: "Sin datos"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {pagination && <div className="flex items-center justify-end space-x-2 mx-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>}
    </div>
  )
};

export const DataTable = forwardRef(DataTableInner) as <TData>(
  props:DataTableProps<TData> & {ref?: React.ForwardedRef<DataTableRef>}
) => ReturnType<typeof DataTableInner>

 

import React, { useEffect, useRef, useState } from 'react'
import { ColumnProps, DataTable, DataTableRef } from '../Table/Table'
import Spinner from '../Spinner/Spinner';
import { Indexable } from '@/types/indexable'
import { Fetcher } from '@/types/fetcher'
import { NextRouter, useRouter } from 'next/router'
import { ControllerInterface, ControllerProps } from '@/types/controller';
import useSearcher from '@/hooks/useSearcher';

interface GenericCRUDViewProps<TEntity> {
    useFetcher: Fetcher<TEntity>,
    useManager: (props: ControllerProps) => ControllerInterface 
    columns: ColumnProps<TEntity>[],
    entityIdField: keyof TEntity,
    viewWhen?: (row: TEntity) => boolean
    deleteWhen?: (row: TEntity) => boolean
    editWhen?: (row: TEntity) => boolean
}

export default function GenericCRUDTable<TEntity extends Indexable>({useFetcher, useManager, columns, entityIdField, viewWhen, editWhen, deleteWhen}:Readonly<GenericCRUDViewProps<TEntity>>) {
    const router:NextRouter = useRouter()
    const {data, loading, refetch} = useFetcher();
    const { delete: {deleteEntity} } = useManager({onDelete: ()=>{
      refetch()
    }})
    const [filter, setFilter] = useState("")
    useSearcher({fetch: refetch, filterValue: filter})


    if(loading)
      return <Spinner/>
    
    if(!(data instanceof Array))
      return
      
    return (
        <DataTable
          columns={columns}
          data={data ?? []}
          onEdit={(e)=>{
            router.push(`${router.pathname}/form/${e[entityIdField]}`)
          }}
          onGlobalFilter={setFilter}
          onDelete={deleteEntity} 
          onAdd={() => router.push(`${router.pathname}/form`)} 
          onView={(e) => router.push(`${router.pathname}/${e[entityIdField]}`)}
          deleteWhen={deleteWhen}
          editWhen={editWhen}
          viewWhen={viewWhen}
        />
    )
}

 

import React from 'react'
import { ColumnProps, DataTable } from '../Table/Table'
import Spinner from '../Spinner/Spinner';
import { Indexable } from '@/types/indexable'
import { Fetcher } from '@/types/fetcher'
import { NextRouter, useRouter } from 'next/router'
import AddButton from '../Buttons/AddButton/AddButton'

interface GenericCRUDViewProps<TEntity> {
    useFetcher: Fetcher<TEntity>,
    deleteEntity: (e:TEntity)=>void 
    columns: ColumnProps<TEntity>[],
    entityIdField: string
}

export default function GenericCRUDTable<TEntity extends Indexable>({useFetcher, deleteEntity, columns, entityIdField}:Readonly<GenericCRUDViewProps<TEntity>>) {
    const router:NextRouter = useRouter()
    const {data, loading} = useFetcher();
  
    if(loading)
      return <Spinner/>
    
    if(!(data instanceof Array))
      return
      
    return (
      <div>
        <DataTable columns={columns} data={data ?? []} onEdit={(c)=>{
          router.push(`./form/${c[entityIdField]}`)
        }} onDelete={deleteEntity} />
        <AddButton onClick={()=>router.push("./form")} className='my-3' />
      </div>
    )
}

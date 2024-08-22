import React, { useEffect, useState } from 'react'
import { TextInput } from '../TextInput/TextInput'
import { Fetcher } from '@/types/fetcher'
import Spinner from '../Spinner/Spinner'
import useSearcher from '@/hooks/useSearcher'
import { Button } from '../ui/button'

interface PaginatorProps<TEntity> {
    pageSize?:number
    searchPlaceholder?:string
    useFetcher:Fetcher<TEntity>
    bodyCell: (entity:TEntity) => React.ReactNode,
    className?:string
    contentClassName?:string
}

export default function Paginator<TEntity>({pageSize=50,searchPlaceholder="", useFetcher,bodyCell,className="",contentClassName=""}:Readonly<PaginatorProps<TEntity>>) {
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState("")
    const [data, setData] = useState<TEntity[]>([]);
    const {data:nextData, refetch, loading} = useFetcher();
    const [isMoreData, setIsMoreData] = useState(false)

    useSearcher({fetch:refetch, limit:pageSize, filterValue: search, onSearch: () => {
        setPage(0)
    }})

    useEffect(()=>{
        if(!loading && nextData instanceof Array){
            setIsMoreData(nextData.length == pageSize)
            nextData.length > 0 && setData(nextData)
        }
    },[loading])


    if(loading) return <div className='w-full'><Spinner/></div> 

    if(!(data instanceof Array)) return

    return <div className={`flex flex-col gap-3 ${className}`}>
        {searchPlaceholder && <TextInput className='w-full' value={search} onChange={e => {
            setSearch(e.target.value)
        }} placeholder={searchPlaceholder} />}
        <div className='flex justify-between'>
            <Button variant={"outline"} disabled={page == 0} onClick={()=>{
                setPage(page-1)                
                refetch({offSet:pageSize*(page-1), limit:pageSize, filter:search})
            }} >Anterior</Button>
            <Button variant={"outline"} disabled={!isMoreData} onClick={()=>{
                refetch({offSet:pageSize*(page+1), limit:pageSize, filter:search})
                setPage(page+1)
            }}>Siguiente</Button>
        </div>
        <div className={`flex flex-wrap gap-3 ${contentClassName}`}>
            {data.map(bodyCell)}
        </div>
    </div>
}

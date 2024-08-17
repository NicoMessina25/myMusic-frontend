import { FetchProps } from '@/types/fetcher';
import React, { useEffect, useRef } from 'react'

interface SearcherProps {
    fetch: (props?:FetchProps) => void
    filterValue:string
    timeout?:number
    limit?:number
}

export default function useSearcher({fetch, filterValue, limit, timeout=500}:SearcherProps) {

    const filterTimeout:any = useRef(null);

    useEffect(() => {
        filterTimeout.current = setTimeout(() => { fetch({filter: filterValue, limit}) }, timeout)
        return () => filterTimeout.current && clearTimeout(filterTimeout.current)
    }, [filterValue])

}

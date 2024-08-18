import { FetchProps } from '@/types/fetcher';
import React, { useEffect, useRef, useState } from 'react'

interface SearcherProps {
    fetch: (props?:FetchProps) => void
    filterValue:string
    timeout?:number
    limit?:number
}

export default function useSearcher({fetch, filterValue, limit, timeout=500}:SearcherProps) {

    const filterTimeout:any = useRef(null);
    const [firstLoad, setFirstLoad] = useState(true)

    useEffect(() => {
        if(!firstLoad)
            filterTimeout.current = setTimeout(() => { fetch({filter: filterValue, limit}) }, timeout)
        else setFirstLoad(false)


        return () => filterTimeout.current && clearTimeout(filterTimeout.current)
    }, [filterValue])

}

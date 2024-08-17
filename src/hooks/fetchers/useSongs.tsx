import { getSongById, getSongs } from '@/services/songs';
import { FetcherResult, FetchProps } from '@/types/fetcher';
import { Song } from '@/types/song';
import { useEffect, useState } from 'react';



export default function useSongs(entityId?:number, initialProps?:FetchProps):FetcherResult<Song> {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [data, setData] = useState<Song | Song[]>([])

    useEffect(()=>{
        setLoading(true)
        fetch(initialProps)
    },[])

    function fetch(props?:FetchProps){
        (entityId ? getSongById(entityId) : getSongs(props)).then(res=>{
            if(res.success)
                setData(res.data)
            else {
                setError(true)
                setErrorMessage(res.message)
            }
        }).catch(() => {
            setError(true)
            setErrorMessage("Fallo inesperado")
        }).finally(()=>setLoading(false))
    }

    return {data, loading, error: {error: error, message: errorMessage}, refetch: fetch};
}

import { getArtistById, getArtists } from '@/services/artists';
import { FetcherResult, FetchProps } from '@/types/fetcher';
import { Artist } from '@/types/artist';
import { useEffect, useState } from 'react';

export default function useArtists(entityId?:number):FetcherResult<Artist> {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [data, setData] = useState<Artist | Artist[]>()

    useEffect(()=>{
        setLoading(true)
        fetch()
    },[])

    function fetch(props?:FetchProps){
        (entityId ? getArtistById(entityId) : getArtists(props)).then(res=>{
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

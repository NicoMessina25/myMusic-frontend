import { getProfiles } from '@/services/profiles';
import { FetcherResult } from '@/types/fetcher';
import { Profile } from '@/types/profile';
import { useEffect, useState } from 'react';



export default function useProfiles():FetcherResult<Profile> {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [data, setData] = useState<Profile[]>([])

    useEffect(()=>{
        setLoading(true)
        fetch()
    },[])

    function fetch(){
        getProfiles().then(res=>{
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

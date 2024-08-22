import { getUserById, getUsers } from '@/services/users';
import { FetcherResult } from '@/types/fetcher';
import { User } from '@/types/user';
import { useEffect, useState } from 'react';



export default function useUsers(entityId?:number):FetcherResult<User> {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [data, setData] = useState<User | User[]>([])

    useEffect(()=>{
        fetch()
    },[])

    function fetch(){
        setLoading(true);
        (entityId ? getUserById(entityId) : getUsers()).then(res=>{
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

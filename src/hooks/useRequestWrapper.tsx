import { TResult } from '@/types/controller'
import { CustomResponse } from '@/types/serverResponse'
import React from 'react'
import useNotification from './useNotification'

export interface RequestWrapper {
    request: (caller: () => Promise<CustomResponse>, result: TResult, setResult: (result: TResult) => void, onSuccess?: () => void) => void
}

export default function useRequestWrapper(): RequestWrapper {
    const {notifySuccess, notifyError} = useNotification()
  
    function request(caller: () => Promise<CustomResponse>, result: TResult, setResult: (result: TResult) => void, onSuccess?: () => void){
        setResult({...result, loading: true})
        caller().then(res=>{
            setResult({
                error: {
                    error: !res.success,
                    message: res.message
                },
                loading: false
            })
            notifySuccess(res.message)
            onSuccess?.()
        }).catch(()=>{
            notifyError("Fallo inesperado")
        }).finally(() => setResult({...result, loading: false}))
    }
  
    return {request}
}

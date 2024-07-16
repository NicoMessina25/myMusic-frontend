 

import React from 'react'
import { useRouter as useNextRouter } from 'next/navigation'
import { useDispatch } from 'react-redux';
import { setLoader } from '../redux/slices/loaderSlice';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export default function useRouter():AppRouterInstance {
    const router:AppRouterInstance = useNextRouter();
    const dispatch = useDispatch()

    return {...router, push:(path:string)=>{
        dispatch(setLoader(true))
        return router.push(path)
    }}
}

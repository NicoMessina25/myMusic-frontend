import UserForm from '@/components/Forms/UserForm';
import GenericEditEntityView from '@/components/GenericEditEntityView/GenericEditEntityView';
import GenericLayout from '@/components/GenericLayout/GenericLayout';
import useUsers from '@/hooks/fetchers/useUsers';
import useUser from '@/hooks/managers/useUser';
import { EditProps } from '@/types/form';
import { NextRouter, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function UserEdit() {
    const router:NextRouter = useRouter();
    const [editProps, setEditProps] = useState<EditProps>({
        params: {
            id: Number(router.query.userId)
        }
    })

    useEffect(()=>{
        setEditProps({...editProps, params: {
            id: Number(router.query.userId)
        }})
    },[router.query.userId])
     
    return <GenericLayout title='Editar usuario'> 
        {editProps.params.id && <GenericEditEntityView formComponent={UserForm} useFetcher={useUsers} useManager={useUser} params={editProps.params} /> }  
    </GenericLayout>

}
import UserForm from '@/components/Forms/UserForm';
import GenericLayout from '@/components/GenericLayout/GenericLayout';
import useUser from '@/hooks/managers/useUser';
import { NextRouter, useRouter } from 'next/router';
import React from 'react'


export default function UserAddView() {
    const router:NextRouter = useRouter();
    
    const {save: {saveEntity}} = useUser({onSave:()=>{
        router.back();
    }})

    return <GenericLayout title='Agregar usuario'> 
        <UserForm onSubmit={saveEntity} />      
    </GenericLayout>  

}
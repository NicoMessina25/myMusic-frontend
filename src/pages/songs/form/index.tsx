import SongForm from '@/components/Forms/SongForm';
import GenericLayout from '@/components/GenericLayout/GenericLayout';
import useSong from '@/hooks/managers/useSong';
import { NextRouter, useRouter } from 'next/router';
import React from 'react'


export default function SongAddView() {
    const router:NextRouter = useRouter();
    
    const {save: {saveEntity}} = useSong({onSave:()=>{
        router.back();
    }})

    return <GenericLayout title='Agregar canción'> 
        <SongForm onSubmit={saveEntity} />      
    </GenericLayout>
}
import SongForm from '@/components/Forms/SongForm';
import GenericEditEntityView from '@/components/GenericEditEntityView/GenericEditEntityView';
import GenericLayout from '@/components/GenericLayout/GenericLayout';
import useSongs from '@/hooks/fetchers/useSongs';
import useSong from '@/hooks/managers/useSong';
import { EditProps } from '@/types/form';
import { NextRouter, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function SongEdit() {
    const router:NextRouter = useRouter();
    const [editProps, setEditProps] = useState<EditProps>({
        params: {
            id: Number(router.query.songId)
        }
    })

    useEffect(()=>{
        setEditProps({...editProps, params: {
            id: Number(router.query.songId)
        }})
    },[router.query.songId])
     
    return <GenericLayout title='Editar canción'> 
        {editProps.params.id && <GenericEditEntityView formComponent={SongForm} useFetcher={useSongs} useManager={useSong} params={editProps.params} /> }  
    </GenericLayout>

}
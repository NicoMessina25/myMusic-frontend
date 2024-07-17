import SongForm from '@/components/Forms/SongForm';
import GenericEditEntityView from '@/components/GenericEditEntityView/GenericEditEntityView';
import GenericLayout from '@/components/GenericLayout/GenericLayout';
import useSongs from '@/hooks/fetchers/useSongs';
import useSong from '@/hooks/managers/useSong';
import { EditProps } from '@/types/form';
import { NextRouter, useRouter } from 'next/router';
import React from 'react'

export default function SongEdit() {
    const router:NextRouter = useRouter();
    const {params}:EditProps = {
        params: {
            id: Number(router.query.songId)
        }
    }
     
    return <GenericLayout title='Editar canción'> 
        <GenericEditEntityView formComponent={SongForm} useFetcher={useSongs} useManager={useSong} params={params} />    
    </GenericLayout>

}
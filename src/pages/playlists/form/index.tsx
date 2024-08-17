import PlaylistForm from '@/components/Forms/PlaylistForm';
import GenericLayout from '@/components/GenericLayout/GenericLayout';
import usePlaylist from '@/hooks/managers/usePlaylist';
import { useRouter } from 'next/router';
import React from 'react';

export default function PlaylistAddView() {
  const router = useRouter();
  
  const { save: { saveEntity } } = usePlaylist({
    onSave: () => {
      router.back();
    }
  });

  return (
    <GenericLayout title='Agregar Playlist'> 
      <PlaylistForm onSubmit={saveEntity} />      
    </GenericLayout>
  );
}

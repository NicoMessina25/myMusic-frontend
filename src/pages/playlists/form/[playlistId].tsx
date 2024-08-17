import PlaylistForm from '@/components/Forms/PlaylistForm';
import GenericEditEntityView from '@/components/GenericEditEntityView/GenericEditEntityView';
import GenericLayout from '@/components/GenericLayout/GenericLayout';
import usePlaylists from '@/hooks/fetchers/usePlaylists';
import usePlaylist from '@/hooks/managers/usePlaylist';
import { EditProps } from '@/types/form';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function PlaylistEdit() {
  const router = useRouter();
  const [editProps, setEditProps] = useState<EditProps>({
    params: {
      id: Number(router.query.playlistId),
    },
  });

  useEffect(() => {
    setEditProps({ ...editProps, params: { id: Number(router.query.playlistId) } });
  }, [router.query.playlistId]);

  return (
    <GenericLayout title='Editar Playlist'>
      {editProps.params.id && (
        <GenericEditEntityView
          formComponent={PlaylistForm}
          useFetcher={usePlaylists}
          useManager={usePlaylist}
          params={editProps.params}
        />
      )}
    </GenericLayout>
  );
}

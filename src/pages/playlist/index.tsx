import GenericCRUDTable from '@/components/GenericCRUDTable/GenericCRUDTable';
import GenericLayout from '@/components/GenericLayout/GenericLayout';
import usePlaylists from '@/hooks/fetchers/usePlaylists';
import usePlaylist from '@/hooks/managers/usePlaylist';
import useLoggedUser from '@/hooks/useLoggedUser';
import { EProfile } from '@/types/profile';
import { Playlist } from '@/types/playlist';
import React from 'react';

export default function Playlists() {
  const user = useLoggedUser();

  return (
    <GenericLayout title='Playlists'>
      <div className='w-full py-4'>
        <GenericCRUDTable
          useFetcher={usePlaylists}
          columns={[
            { accessorKey: "name", header: "Nombre" },
            { accessorKey: "description", header: "Descripción" },
          ]}
          useManager={usePlaylist}
          entityIdField='playlistId'
          deleteWhen={() =>
            !!(user?.profile?.profileId && [EProfile.ADMIN, EProfile.ADMINISTRATIVE].includes(user?.profile?.profileId))
          }
          editWhen={() =>
            !!(user?.profile?.profileId && [EProfile.ADMIN, EProfile.ADMINISTRATIVE].includes(user?.profile?.profileId))
          }
        />
      </div>
    </GenericLayout>
  );
}

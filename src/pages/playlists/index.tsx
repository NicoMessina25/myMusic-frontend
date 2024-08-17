import GenericCRUDTable from '@/components/GenericCRUDTable/GenericCRUDTable';
import GenericLayout from '@/components/GenericLayout/GenericLayout';
import usePlaylists from '@/hooks/fetchers/usePlaylists';
import usePlaylist from '@/hooks/managers/usePlaylist';
import useLoggedUser from '@/hooks/useLoggedUser';
import { EProfile } from '@/types/profile';
import { Playlist } from '@/types/playlist';
import React from 'react';
import { formatDate } from '@/services/utils';

export default function Playlists() {

  return (
    <GenericLayout title='Playlists'>
      <div className='w-full py-4'>
        <GenericCRUDTable
          useFetcher={usePlaylists}
          columns={[
            { accessorKey: "name", header: "Nombre" },
            { accessorKey: "description", header: "Descripción" },
            { accessorKey: "created_at", header: "Creada", body: (row:Playlist) => formatDate(row.created_at, "dd/MM/yyyy - HH:mm")}
          ]}
          useManager={usePlaylist}
          entityIdField='playlistId'
        />
      </div>
    </GenericLayout>
  );
}

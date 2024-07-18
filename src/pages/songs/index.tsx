import GenericCRUDTable from '@/components/GenericCRUDTable/GenericCRUDTable'
import GenericLayout from '@/components/GenericLayout/GenericLayout'
import ViewWrapper from '@/components/ViewWrapper/ViewWrapper'
import useSongs from '@/hooks/fetchers/useSongs'
import useSong from '@/hooks/managers/useSong'
import { formatDate, getDate, toHHMMSS } from '@/services/utils'
import { Song } from '@/types/song'
import React from 'react'

export default function Songs() {
  return <GenericLayout title='Canciones'>
      <div className='w-full py-4'>
        <GenericCRUDTable useFetcher={useSongs} columns={[{
          accessorKey: "title",
          header: "Nombre",
        },{
          accessorKey: "length",
          header: "Duración",
          body: (row: Song) => toHHMMSS(row.length) 
        },{
          accessorKey: "releaseDate",
          header: "Lanzamiento",
          body: (row: Song) => formatDate(getDate(row.releaseDate), "dd/MM/yyyy") 
        }]} useManager={useSong} entityIdField='songId'  />
      </div>
    </GenericLayout>
}

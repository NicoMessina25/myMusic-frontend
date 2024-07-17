import GenericCRUDTable from '@/components/GenericCRUDTable/GenericCRUDTable'
import GenericLayout from '@/components/GenericLayout/GenericLayout'
import ViewWrapper from '@/components/ViewWrapper/ViewWrapper'
import useSongs from '@/hooks/fetchers/useSongs'
import useSong from '@/hooks/managers/useSong'
import { formatDate, seconds2time } from '@/services/utils'
import { Song } from '@/types/song'
import React from 'react'

export default function Songs() {
  return <ViewWrapper>
    <GenericLayout title='Canciones'>
      <div className='w-full py-4'>
        <GenericCRUDTable useFetcher={useSongs} columns={[{
          accessorKey: "title",
          header: "Nombre",
        },{
          accessorKey: "length",
          header: "Duración",
          body: (row: Song) => seconds2time(row.length) 
        },{
          accessorKey: "releaseDate",
          header: "Lanzamiento",
          body: (row: Song) => formatDate(row.releaseDate, "dd/MM/yyyy") 
        }]} useManager={useSong} entityIdField='songId'  />
      </div>
    </GenericLayout>
  </ViewWrapper>
}

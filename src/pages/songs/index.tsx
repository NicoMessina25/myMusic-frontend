import GenericCRUDTable from '@/components/GenericCRUDTable/GenericCRUDTable'
import GenericLayout from '@/components/GenericLayout/GenericLayout'
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
        },{
          accessorKey: "artists",
          header: "Artistas",
          body: (row: Song) => {
            return <p style={{
              maxWidth: 300,
              whiteSpace: "nowrap", // Esto evitará que el texto se ajuste a una nueva línea
              overflow: "hidden", // Esto ocultará cualquier texto que sobrepase el contenedor
              textOverflow: "ellipsis" // Esto añadirá los puntos suspensivos al final del texto
          
            }}>{row.artists?.map(a => a.name).join(", ")}</p>
          }
        }]} useManager={useSong} entityIdField='songId'  />
      </div>
    </GenericLayout>
}

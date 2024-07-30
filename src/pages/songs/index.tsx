import GenericCRUDTable from '@/components/GenericCRUDTable/GenericCRUDTable'
import GenericLayout from '@/components/GenericLayout/GenericLayout'
import useSongs from '@/hooks/fetchers/useSongs'
import useSong from '@/hooks/managers/useSong'
import useLoggedUser from '@/hooks/useLoggedUser'
import { formatDate, getDate, toHHMMSS } from '@/services/utils'
import { EProfile } from '@/types/profile'
import { Song } from '@/types/song'
import React from 'react'

export default function Songs() {
  const user = useLoggedUser()

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
        }]} useManager={useSong} entityIdField='songId'  
            deleteWhen={() => !!(user?.profile?.profileId && [EProfile.ADMIN, EProfile.ADMINISTRATIVE].includes(user?.profile?.profileId))}
            editWhen={() => !!(user?.profile?.profileId && [EProfile.ADMIN, EProfile.ADMINISTRATIVE].includes(user?.profile?.profileId))}
        />
      </div>
    </GenericLayout>
}

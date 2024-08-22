import React from 'react'

import { Inter } from "next/font/google";
import packageJSON from '../../../package.json';
import { Button } from '../ui/button';
import { logout } from '@/services/auth';
import { deleteCookie } from '@/services/cookies';
import { useRouter } from 'next/router';
import useLoggedUser from '@/hooks/useLoggedUser';
import MenuNav from '../MenuNav/MenuNav';
import { EProfile } from '@/types/profile';

const inter = Inter({ subsets: ["latin"] });

export interface ViewWrapperProps{
    children: React.ReactNode
}

export default function ViewWrapper({children}:Readonly<ViewWrapperProps>) {
  const router = useRouter()
  const user = useLoggedUser()

  return <div className={`flex w-full justify-between min-h-screen p-4 ${inter.className}`}>
    <div className='flex flex-col w-full'>
      <div className="w-full flex justify-center">
          <MenuNav menuItems={[
            {
              name:"Inicio",
              route:"/"
            },
            {
              name: "Canciones",
              route: "/songs"
            },
            {
              name: "Playlist",
              route: "/playlists",
            },
            {
              name: "Usuarios",
              visible: user?.profile?.profileId == EProfile.ADMIN,
              route: "/users"
            }
          ]} />
        </div>
        {children}
    </div>
    <div className='flex flex-col items-end absolute right-4 gap-2'>
      <div className='flex w-full justify-between gap-3'>
        <p className='text-xs'>{user?.username}</p>
        <p className='text-xs text-slate-500'>{"v"+packageJSON.version}</p>
      </div>
      <Button variant={'outline'} className='text-xs' onClick={()=> {
        logout().then(data=>{
           // Elimina las cookies que contienen los tokens
          if(data.success){
            deleteCookie('MYMUSIC');
            deleteCookie('MYMUSICREFRESH');
            router.push("/login")
          } 
        }).catch(err => 
          console.log(err)
        )
      }}>Cerrar sesión</Button>
    </div>
    
  </div>
}

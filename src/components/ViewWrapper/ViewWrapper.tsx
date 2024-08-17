import React from 'react'

import { Inter } from "next/font/google";
import packageJSON from '../../../package.json';
import { Button } from '../ui/button';
import { logout } from '@/services/auth';
import { deleteCookie } from '@/services/cookies';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ["latin"] });

export interface ViewWrapperProps{
    children: React.ReactNode
}

export default function ViewWrapper({children}:Readonly<ViewWrapperProps>) {
  const router = useRouter()

  return <div className={`flex w-full justify-between min-h-screen p-4 ${inter.className}`}>
    {children}
    <div className='flex flex-col items-end absolute right-4'>
      <p className='text-xs text-slate-500'>{"v"+packageJSON.version}</p>
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

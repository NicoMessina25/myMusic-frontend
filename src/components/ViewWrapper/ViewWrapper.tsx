import React from 'react'

import { Inter } from "next/font/google";
import packageJSON from '../../../package.json';

const inter = Inter({ subsets: ["latin"] });

export interface ViewWrapperProps{
    children: React.ReactNode
}

export default function ViewWrapper({children}:Readonly<ViewWrapperProps>) {
  return <div className={`flex w-full justify-between min-h-screen p-4 ${inter.className}`}>
    {children}
    <p className='text-xs text-slate-500'>{"v"+packageJSON.version}</p>
  </div>
}

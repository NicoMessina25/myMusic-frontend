import React from 'react'

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export interface ViewWrapperProps{
    children: React.ReactNode
}

export default function ViewWrapper({children}:Readonly<ViewWrapperProps>) {
  return <div className={`flex w-full min-h-screen py-4 px-10 ${inter.className}`}>
    {children}
  </div>
}

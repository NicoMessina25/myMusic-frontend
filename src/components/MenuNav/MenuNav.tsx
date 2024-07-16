import React from 'react'
import { Menubar, MenubarMenu, MenubarTrigger } from '../ui/menubar'
import { useRouter } from 'next/router'

export interface MenuItem {
    name: string
    className?:string
    onClick?: (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    route?: string
}

export interface MenuNavProps {
    menuItems: MenuItem[],
    className?: string
}

export default function MenuNav({menuItems, className = ""}:Readonly<MenuNavProps>) {
    
    const router = useRouter()
    
    return <Menubar className={className}>
        {menuItems.map(({className = "", name, onClick, route}, index)=>
            <MenubarMenu key={index} >
                <MenubarTrigger
                    className={className}
                    onClick={(e)=>{
                        route && router.push(route)
                        onClick?.(e)
                    }}
                >{name}</MenubarTrigger>
            </MenubarMenu>
        )}
    </Menubar>
}

 

import useRouter from '@/hooks/useRouter';
import { Button } from '../../ui/button';
import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react'



export default function BackButton({className = "", text = "Back", onClick}:Readonly<ButtonProps>) {
    const router = useRouter();

    return <Button type='button' variant={'outline'} className={className} onClick={onClick ?? router.back} ><Icon className='mr-1' icon={"icon-park-solid:back"} /> {text}  </Button>
}

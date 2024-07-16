 

import React from 'react'
import { useSelector } from 'react-redux';
import { Alert } from './Alert';
import { RootState } from '@/redux/store';

export default function AlertContainer() {

    const { alerts } = useSelector((state:RootState )=> state.notifications);

    return alerts.map((alert,index)=>
        <Alert key={index+alert.title} {...alert} />
    )
}

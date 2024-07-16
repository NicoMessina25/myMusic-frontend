 

import React from 'react'
import { Label } from '../Label/Label'
import ErrorLabel from '../ErrorLabel/ErrorLabel'

export interface KeyValueLabelProps {
    label:string
    value: string | number | undefined
    errorMessage?: string
    className?:string
    labelClassName?:string
}

export default function KeyValueLabel({value,label,errorMessage,className="",labelClassName=""}:Readonly<KeyValueLabelProps>) {
    return <div className={`flex flex-col ${className}`}>
        <div className='flex'>
            <Label text={label} className={labelClassName} />
            <Label className={`ml-1 font-light ${labelClassName}`} text={value?.toString() ?? ""} />
        </div>
        <ErrorLabel error={!!errorMessage} text={errorMessage} className='mb-1'  />
    </div>
}

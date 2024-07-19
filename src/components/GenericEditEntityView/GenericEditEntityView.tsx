 

import React, {  } from 'react'
import { EditProps, FormProps } from '@/types/form';
import { Fetcher } from '@/types/fetcher';
import { ControllerInterface, ControllerProps } from '@/types/controller';
import { useRouter } from 'next/router';
import Spinner from '../Spinner/Spinner';

interface GenericEditEntityViewProps<TEntity> extends EditProps {
    useFetcher: Fetcher<TEntity>,
    useManager: (props: ControllerProps) => ControllerInterface
    formComponent: (props: FormProps<TEntity>) => React.JSX.Element
}

export default function GenericEditEntityView<TEntity>({params, useFetcher, useManager, formComponent}:Readonly<GenericEditEntityViewProps<TEntity>>) {

    const {id} = params;
    const router = useRouter();
    const {data, loading} = useFetcher(id);
    const {update:{updateEntity}} = useManager({onUpdate:()=>{
        router.back();
    }});


    if(loading)
        return <Spinner/>
    
    if(data instanceof Array || !data)
        return
 

    return React.createElement(formComponent, {
        onSubmit: (e:TEntity)=>{
            id && updateEntity(e, id);
        },
        initialValue: data 
    })
}

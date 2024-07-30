 

import React, { useEffect, useState } from 'react'
import { useForm, Controller, ControllerRenderProps } from 'react-hook-form';
import { FormProps, requiredMessage } from '@/types/form';
import { Song, defaultSong } from '@/types/song';
import { TextInput } from '../TextInput/TextInput';
import BackButton from '../Buttons/BackButton/BackButton';
import SubmitButton from '../Buttons/SubmitButton/SubmitButton';
import { DateInput } from '../DateInput/DateInput';
import { TimeInput } from '../TimeInput/TimeInput';
import { Artist, defaultArtist } from '@/types/artist';
import { Label } from '../Labels/Label/Label';
import KeyValueLabel from '../Labels/KeyValueLabel/KeyValueLabel';
import { Button } from '../ui/button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Combobox } from '../Combobox/Combobox';
import useArtists from '@/hooks/fetchers/useArtists';
import { getDate } from '@/services/utils';
import useNotification from '@/hooks/useNotification';
import { DynamicCombobox } from '../DynamicCombobox/DynamicCombobox';

export default function SongForm({onSubmit, onCancel, initialValue}:Readonly<FormProps<Song>>){
    
    
    const { handleSubmit, control, formState: {errors}} = useForm<Song>({defaultValues: initialValue ?? defaultSong})
    const [newArtist, setNewArtist] = useState<Artist>(defaultArtist)
    const {notifyError} = useNotification()

    function addArtist(field:ControllerRenderProps<Song, "artists">, a:Artist){
        if(field.value.find(artist => artist.name.localeCompare(a.name) === 0))
            notifyError("Artista ya agregado a canción")
        else {
            field.value?.push(a)
            field.onChange(field.value)
            setNewArtist(defaultArtist)
        }
    }

    const inputsWidth = 'w-full md:w-2/5 lg:w-1/4 mx-1';

    const artistTemplate = (artist:Artist,index:number,onDelete:()=>void,registrationErr:string|undefined) => {
        if(!artist) return

        return <div key={artist.artistId! + " " + index} className='rounded-lg bg-cyan-950 px-2 py-1 w-fit gap-2 flex items-center justify-between my-3'>
            <Label className='font-bold italic text-cyan-200 text-xs' text={artist.artistId! > 0 ? `Id: ${artist.artistId}` : 'Nuevo'}/>
            <div className='flex my-4'>
                <KeyValueLabel  labelClassName='font-bold text-lg' label='' value={artist.name} errorMessage={registrationErr} />
                {/* <KeyValueLabel label='Peso máximo: ' value={artist.maxweight} errorMessage={maxWeightErr} className='mx-1' />  */}
            </div>
              
            <Button type='button' variant='destructive' className='p-2' onClick={onDelete} ><Icon className='text-xl' icon={'mdi:trash'} /></Button>
       
            
        </div>
    }
    

    return <div className='flex flex-col items-center mt-6'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full' >
            
            <div className='flex flex-wrap justify-between items-center'>
                <Controller
                    name="title"
                    control={control}
                    rules={{ required: requiredMessage}}
                    render={({ field }) => 
                        <TextInput 
                            label='Título'
                            className={inputsWidth}
                            {...field} 
                            required
                            error={errors.title?.message} 
                        />
                    }
                />

                <Controller
                    name="length"
                    control={control}
                    rules={{
                        required: requiredMessage,
                        min: {
                            value: 0,
                            message: "La canción debe durar al menos un segundo"
                        } 
                    }}
                    render={({ field }) => 
                        <TimeInput
                            label={'Duración (HH:mm:ss)'}
                            className={inputsWidth}
                            {...field}
                            error={errors.length?.message} 
                        />
                    }
                />

                <Controller
                    name="releaseDate"
                    control={control}
                    rules={{
                        validate: value => !value || getDate(value)! <= new Date() || "La fecha no puede ser posterior a hoy"
                    }}
                    render={({ field }) => 
                        <DateInput 
                            label='Lanzamiento'
                            className={inputsWidth}
                            {...field}
                            maxDate={new Date()}
                            value={field.value ?? undefined} 
                            error={errors.releaseDate?.message}
                        />
                    }
                />
            
            <Controller
                name='artists'
                control={control}
                rules={{
                    validate: value => value.length > 0 || 'La canción debe tener al menos un artista'
                }}
                render={({field})=>
                    <div className='my-3 w-full p-4 justify-center rounded bg-slate-900'>
                        {field.value && field.value.length > 0 && <Label className='my-1 text-lg' text='Artistas' />}
                        <div className='flex flex-wrap gap-3'>
                            {field.value?.map((artist,index)=>{
                                
                                return artistTemplate(artist,index,()=>{
                                    field.value?.splice(field.value.indexOf(artist),1)
                                    field.onChange(field.value)
                                    setNewArtist(defaultArtist)
                                }, errors.artists?.[index]?.name?.message)
                            })}
                        </div>
                        

                
                        <div className='flex gap-3'>
                            {<DynamicCombobox 
                                ariaLabel='Nombre' 
                                optionLabel={"name"}
                                error={errors.artists?.message} 
                                keyField={"artistId"}
                                placeholder='Agrega artista existente' 
                                value={newArtist} 
                                useFetcher={useArtists}
                                addToListCombobox
                                onInputChange={(value:string) => {
                                    setNewArtist({...newArtist, name: value})
                                }}  
                                onChange={(a)=>{
                                   a && addArtist(field,a)
                                }} 
                                notFoundText='No se encontraron artistas' 
                                allowsCustomValue 
                                addCustomValueButtonLabel='Agregar nuevo artista' 
                                onAddCustomValue={(value)=>
                                    addArtist(field, {artistId: -1, name: value})}
                            />}         
                        </div>                       
                    </div>
                }
            />
            
            </div>

            <div className='flex justify-end mt-3'>
                <BackButton text='Cancelar' onClick={onCancel} />
                <SubmitButton text='Guardar' className='mx-1' /> 
            </div>
        </form>
        
    </div>
}

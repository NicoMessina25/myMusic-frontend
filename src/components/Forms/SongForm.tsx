 

import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import { FormProps, requiredMessage } from '@/types/form';
import { Song, defaultSong } from '@/types/song';
import { TextInput } from '../TextInput/TextInput';
import BackButton from '../Buttons/BackButton/BackButton';
import SubmitButton from '../Buttons/SubmitButton/SubmitButton';
import { DateInput } from '../DateInput/DateInput';
import TimeInput from '../TimeInput/TimeInput';

export default function SongForm({onSubmit,onCancel, initialValue}:Readonly<FormProps<Song>>){
    
    
    const { handleSubmit, control, formState: {errors}} = useForm<Song>({defaultValues: initialValue ?? defaultSong})

    const inputsWidth = 'w-full md:w-2/5 lg:w-1/4 mx-1';
    

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
                        validate: value => !value || value <= new Date() || "La fecha no puede ser posterior a hoy"
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
            
            {/* <Controller
                name="address"
                control={control}
                render={({ field }) => 
                    <TextInput 
                        label='Dirección'
                        className={inputsWidth}
                        {...field} 
                        error={errors.address?.message} 
                    />
                }
            /> */}</div>

            <div className='flex justify-end mt-3'>
                <BackButton text='Cancelar' onClick={onCancel} />
                <SubmitButton text='Guardar' className='mx-1' /> 
            </div>
        </form>
        
    </div>
}

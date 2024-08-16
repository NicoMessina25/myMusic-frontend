import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import { FormProps, requiredMessage } from '@/types/form';
import { Playlist, defaultPlaylist } from '@/types/playlist';
import { TextInput } from '../TextInput/TextInput';
import BackButton from '../Buttons/BackButton/BackButton';
import SubmitButton from '../Buttons/SubmitButton/SubmitButton';

export default function PlaylistForm({ onSubmit, onCancel, initialValue }: Readonly<FormProps<Playlist>>) {
    const { handleSubmit, control, formState: { errors } } = useForm<Playlist>({ defaultValues: initialValue ?? defaultPlaylist });

    const inputsWidth = 'w-full md:w-2/5 lg:w-1/4 mx-1';

    return (
        <div className='flex flex-col items-center mt-6'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full'>
                <div className='flex flex-wrap justify-between items-center'>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: requiredMessage }}
                        render={({ field }) =>
                            <TextInput
                                label='Nombre de la Playlist'
                                className={inputsWidth}
                                {...field}
                                required
                                error={errors.name?.message}
                            />
                        }
                    />

                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) =>
                            <TextInput
                                label='Descripción'
                                className={inputsWidth}
                                {...field}
                                error={errors.description?.message}
                            />
                        }
                    />
                </div>

                <div className='flex justify-end mt-3'>
                    <BackButton text='Cancelar' onClick={onCancel} />
                    <SubmitButton text='Guardar' className='mx-1' />
                </div>
            </form>
        </div>
    );
}

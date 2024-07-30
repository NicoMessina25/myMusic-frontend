 

import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import { FormProps, requiredMessage } from '@/types/form';
import { User, defaultUser } from '@/types/user';
import { TextInput } from '../TextInput/TextInput';
import BackButton from '../Buttons/BackButton/BackButton';
import SubmitButton from '../Buttons/SubmitButton/SubmitButton';
import useProfiles from '@/hooks/fetchers/useProfiles';
import { DynamicCombobox } from '../DynamicCombobox/DynamicCombobox';

export default function UserForm({onSubmit, onCancel, initialValue}:Readonly<FormProps<User>>){
    
    
    const { handleSubmit, control, getValues, formState: {errors}} = useForm<User>({defaultValues: initialValue ?? defaultUser})

    const inputsWidth = 'w-full md:w-2/5 lg:w-1/4 mx-1';
    

    return <div className='flex flex-col items-center mt-6'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full' >
            
            <div className='flex flex-wrap justify-between items-center'>
                <Controller
                    name="username"
                    control={control}
                    rules={{ required: requiredMessage}}
                    render={({ field }) => 
                        <TextInput
                            label='Nombre de usuario'
                            className={inputsWidth}
                            {...field} 
                            required
                            error={errors.username?.message} 
                        />
                    }
                />

                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: requiredMessage
                    }}
                    render={({ field }) => 
                        <TextInput
                            label='Email'
                            className={inputsWidth}
                            {...field}
                            error={errors.email?.message}
                            required
                        />
                    }
                />

                <Controller
                    name="profile"
                    control={control}
                    rules={{
                        validate: value => value && value.name.length > 0 || requiredMessage
                    }}
                    render={({ field }) => {
                        return <DynamicCombobox
                            label='Perfil'
                            {...field}
                            useFetcher={useProfiles}
                            value={field.value}
                            notFoundText='Sin perfiles encontrados'
                            optionLabel={"name"}
                            keyField={"profileId"}
                            error={errors.profile?.message}
                            required
                        />
                    }
                        
                    }
                />

                <Controller
                    name='password'
                    control={control}
                    rules={{
                        validate: value => {  
                            const userId = getValues("userId")
                            return userId && userId > 0 || value.length > 0 || requiredMessage
                        }
                    }}
                    render={({ field }) =>{
                        const userId = getValues("userId")
                        return <TextInput
                            label={(userId && userId > 0 ? "Cambiar " : "") + 'Contraseña'}
                            className='w-full'
                            {...field}
                            type='password'
                            error={errors.password?.message}
                        />
                    }
                       
                    }
                />

                <Controller
                    name='confirmPassword'
                    control={control}
                    rules={{
                        validate: value => value === getValues("password") || "Las contraseñas deben ser iguales"
                    }}
                    render={({ field }) =>
                        <TextInput
                            label='Confirmar Contraseña'
                            className='w-full'
                            {...field}
                            type='password'
                            error={errors.confirmPassword?.message}
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
}

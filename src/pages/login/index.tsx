import { TextInput } from "@/components/TextInput/TextInput";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import useLoader from "@/hooks/useLoader";
import useNotification from "@/hooks/useNotification";
import { requiredMessage } from "@/types/form";
import { User } from "@/types/user";
import { NextRouter, useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";

export default function Login() {
    const {handleSubmit, control, formState: {errors}} = useForm<User>({defaultValues: {username:"", password:""}});
    const {authenticate} = useAuth()
    const router:NextRouter = useRouter();
    const {notifyError,notifyInfo} = useNotification();
    const loader = useLoader();

    return (
        <section className='w-full h-screen flex flex-col justify-center items-center '>
            <form className='h-fit w-2/3 md:w-1/4 bg-slate-900/75  p-4 rounded-xl flex flex-col items-center' onSubmit={handleSubmit((u)=>{
                loader(true)
                authenticate(u.username, u.password).then((u:User|null)=>{
                    loader(false)
                    if(u?.username){
                        notifyInfo("Has ingresado")
                        router.push('/')
                    } else notifyError("Usuario o contraseña incorrectos")
                }).catch(err => {
                    notifyError(err)
                })
            })}>
                <Controller
                    name='username'
                    control={control}
                    rules={{ required: requiredMessage}}
                    render={({field})=>
                        <TextInput
                            label='Usuario'
                            className='w-full'
                            {...field}
                            error={errors.username?.message}
                        />
                    }
                />

                <Controller 
                    name='password'
                    control={control}                   
                    rules={{ required: requiredMessage}}
                    render={({field})=>
                        <TextInput 
                            label='Contraseña'  
                            className='w-full'
                            {...field}
                            type='password'
                            error={errors.password?.message}
                        />
                    }
                />
                <div className="flex gap-3 mt-3">
                    <Button variant='secondary' type="button" onClick={()=>router.push("/register")}>Registrarse</Button>                    
                    <Button>Ingresar</Button>
                </div>
                
            </form>
        </section>
    )
}

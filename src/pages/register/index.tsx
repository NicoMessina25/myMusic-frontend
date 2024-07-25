import { TextInput } from "@/components/TextInput/TextInput";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import useLoader from "@/hooks/useLoader";
import useNotification from "@/hooks/useNotification";
import { requiredMessage } from "@/types/form";
import { CustomResponse } from "@/types/serverResponse";
import { User } from "@/types/user";
import { NextRouter, useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";

export default function Register() {
    const { handleSubmit, control, formState: { errors } } = useForm<User>({ defaultValues: { username: "", password: "", confirmPassword: "" } });
    const { register } = useAuth();
    const router: NextRouter = useRouter();
    const { notifyError, notifyInfo } = useNotification();
    const loader = useLoader();

    return (
        <section className='w-full h-screen flex flex-col justify-center items-center'>
            <form className='h-fit w-2/3 md:w-1/4 bg-slate-900/75 p-4 rounded-xl flex flex-col items-center' onSubmit={handleSubmit((u) => {
                loader(true);
                if (u.password !== u.confirmPassword) {
                    loader(false);
                    notifyError("Las contraseñas no coinciden");
                    return;
                }
                register(u.username, u.password, u.confirmPassword).then((customresponse: CustomResponse) => {
                    loader(false);
                    if (customresponse.success) {
                        notifyInfo("Registro exitoso");
                        router.push('/login');
                    } else notifyError("Error en el registro");
                }).catch(err => {
                    loader(false);
                    notifyError(err);
                });
            })}>
                <Controller
                    name='username'
                    control={control}
                    rules={{ required: requiredMessage }}
                    render={({ field }) =>
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
                    rules={{ required: requiredMessage }}
                    render={({ field }) =>
                        <TextInput
                            label='Contraseña'
                            className='w-full'
                            {...field}
                            type='password'
                            error={errors.password?.message}
                        />
                    }
                />

                <Controller
                    name='confirmPassword'
                    control={control}
                    rules={{ required: requiredMessage }}
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

                <Button variant='outline' className='mt-3'>Registrarse</Button>
            </form>
        </section>
    );
}

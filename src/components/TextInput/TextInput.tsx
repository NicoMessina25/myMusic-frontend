 

import { Input } from '@/components/ui/input';
import { forwardRef, ChangeEventHandler, FocusEventHandler, useState, useEffect } from 'react';
import { Label } from '../Labels/Label/Label';
import ErrorLabel from '../Labels/ErrorLabel/ErrorLabel';
import { InputProps } from '@/types/input';
import { Icon } from '@iconify/react/dist/iconify.js';

type Type = 'text' | 'password' | 'email' | "tel" | "number"

interface TextInputProps extends InputProps {
  type?: Type
  value: string | number | null | undefined
  name?: string;
  inputClassName?:string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, name, required, inputClassName="", className="", type="text", value, ...props }, ref) => {

    const [stateType, setStateType] = useState<Type>(type)
    const [showPassword, setShowPassword] = useState<boolean>(type !== 'password')

    useEffect(()=>{
      setStateType(showPassword ? 'text':'password')
    },[showPassword])

    return (
      <div className={className + " flex flex-col gap-y-1.5 my-2"}>
        {label && (
          <Label htmlFor={name} className={`font-semibold ${error ? "text-danger":""}`} text={label} required={required} />
        )}
        <div className='flex gap-2 items-center'>
          <Input
            {...props}
            value={value ?? ""}
            ref={ref}
            type={stateType}
            step={"any"}
            id={name}
            className={`${inputClassName} ${error? "border-danger text-danger":"text-zinc-300"} w-full rounded-medium focus:outline-0 px-2 py-1`}
            aria-invalid={!!error}
            aria-errormessage={`${name}-error`}
          />
          {type === 'password' &&
            <Icon icon={showPassword ? 'mdi:eye-off':'mdi:eye'} onClick={()=> setShowPassword(!showPassword)} className='w-7 h-7 p-1 rounded-xl transition-all hover:text-blue-300 hover:bg-blue-50/10 cursor-pointer' />
          }
        </div>
        
        <ErrorLabel error={!!error} text={error} htmlFor={name} />
      </div>
    );
  }
);

TextInput.displayName = 'TextInput'
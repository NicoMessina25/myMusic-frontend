 

import { Input } from '@/components/ui/input';
import { forwardRef, ChangeEventHandler, FocusEventHandler } from 'react';
import { Label } from '../Labels/Label/Label';
import ErrorLabel from '../Labels/ErrorLabel/ErrorLabel';
import { InputProps } from '@/types/input';

interface TextInputProps extends InputProps {
  type?: 'text' | 'password' | 'email' | "tel" | "number"
  value: string | number | null | undefined
  name?: string;
  inputClassName?:string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, name, required, inputClassName, className, type="text", value, ...props }, ref) => {
    

    return (
      <div className={className + " flex flex-col gap-y-1.5 my-2"}>
        {label && (
          <Label htmlFor={name} className={`font-semibold ${error ? "text-danger":""}`} text={label} required={required} />
        )}
        <Input
          {...props}
          value={value ?? ""}
          ref={ref}
          type={type}
          step={"any"}
          id={name}
          className={`${inputClassName} ${error? "border-danger text-danger":"text-zinc-300"} w-full rounded-medium focus:outline-0 px-2 py-1`}
          aria-invalid={!!error}
          aria-errormessage={`${name}-error`}
        />
        <ErrorLabel error={!!error} text={error} htmlFor={name} />
      </div>
    );
  }
);

TextInput.displayName = 'TextInput'
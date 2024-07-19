import { getSecondsFromHHMMSS, toHHMMSS } from "@/services/utils";
import { InputProps } from "@/types/input";
import React, { ChangeEvent, ChangeEventHandler, FocusEvent, useState } from "react";
import { TextInput } from "../TextInput/TextInput";

interface TimeInputProps extends InputProps {
    onChange: (seconds:number) => void;
    value?: number | null
}

export const TimeInput = React.forwardRef<HTMLInputElement, TimeInputProps>((props:TimeInputProps) => {
    const defaultValue = "0:00"
    const [value, setValue] = useState(toHHMMSS(props.value) || defaultValue);

    const onChange = (event:ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
  
    const onBlur = (event:FocusEvent<HTMLInputElement, Element>) => {
      const value = event.target.value;
      const seconds = Math.max(0, getSecondsFromHHMMSS(value));
        
      props.onChange(seconds)
      const time = toHHMMSS(seconds) || defaultValue;
      setValue(time);
    };

  
    return (
       <TextInput
        type="text"
        {...props}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
       />
    );
  });

  
TimeInput.displayName = "TimeInput"
  

 

import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"
import { InputProps } from "@/types/input"
import { Label } from "../Labels/Label/Label"
import { formatDate, getDate } from "@/services/utils"
import style from './DateInput.module.scss' 

interface DateInputProps extends InputProps {
    value: Date | undefined
    onChange: (d: Date | undefined) => void
    maxDate?: Date,
    minDate?: Date
}

export function DateInput({value, onChange, placeholder = "", label, maxDate, minDate, className = ""}:Readonly<DateInputProps>) {
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  return (
    <div className={`flex flex-col my-2 ${className} ${style.dateInput}`}>
      <Popover>
        {label && <Label text={label} className="my-1" />}
        <PopoverTrigger asChild>
          <Button
            ref={buttonRef}
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? formatDate(getDate(value), "dd/MM/yyyy") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(e) => {
              onChange(e)
              buttonRef.current?.click()
            }}
            toDate={maxDate}
            fromDate={minDate}
            initialFocus
            defaultMonth={getDate(value) ?? undefined}
            fromYear={1900}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </div>
    
  )
}

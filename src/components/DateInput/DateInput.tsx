 

import * as React from "react"

import { InputProps } from "@/types/input"
import { getDate, toISOString } from "@/services/utils"
import {DatePicker} from "@nextui-org/date-picker";
import { CalendarDate } from "@nextui-org/react"
import {parseDate} from "@internationalized/date";
import {I18nProvider} from "@react-aria/i18n";
import { Label } from "../Labels/Label/Label";

interface DateInputProps extends InputProps {
    value: Date | undefined
    onChange: (d: Date | undefined) => void
    maxDate?: Date,
    minDate?: Date
}

function dateToCalendarDate(date?: Date | null): CalendarDate | undefined {
  if(!date) return undefined
  return parseDate(toISOString(date) ?? "");
}

export function DateInput({value, onChange, label, maxDate, minDate, className = "", error, required}:Readonly<DateInputProps>) {

  const [calendarValue, setCalendarValue] = React.useState<CalendarDate|undefined|null>(null);

  React.useEffect(()=>{
    setCalendarValue(dateToCalendarDate(getDate(value)))
  },[])

  return <I18nProvider locale="ES"> <DatePicker 
    label={label && <Label className='font-semibold mb-1' text={label} required={required} />}
    className={`${className} text-zinc-300 w-full rounded focus:outline-0 my-2`}
    variant="bordered"
    dateInputClassNames={{inputWrapper:"border-1 border-input hover:border-1 hover:border-input px-2 py-1"}}
    showMonthAndYearPickers
    isInvalid={!!error}
    errorMessage={(value) => {
      if (value.isInvalid) {
        return error;
      }
    }}
    maxValue={dateToCalendarDate(maxDate)}
    minValue={dateToCalendarDate(minDate)}
    value={calendarValue}
    onChange={(calendarDate: CalendarDate | null) => {
      setCalendarValue(calendarDate)
      calendarDate ? onChange(new Date(calendarDate.year, calendarDate.month - 1, calendarDate.day)) : onChange(undefined)
    }}
    labelPlacement="outside"
  /> </I18nProvider>
    {/* <div className={`flex flex-col my-2 ${className} ${style.dateInput}`}>
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
    </div> */}
    
}

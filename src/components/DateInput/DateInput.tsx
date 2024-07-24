 

import * as React from "react"

import { InputProps } from "@/types/input"
import { getDate } from "@/services/utils"
import {DatePicker} from "@nextui-org/date-picker";
import { CalendarDate } from "@internationalized/date";
import {I18nProvider} from "@react-aria/i18n";
import { Label } from "../Labels/Label/Label";

interface DateInputProps extends InputProps {
    value: Date | undefined
    onChange: (d: Date | undefined | null) => void
    maxDate?: Date,
    minDate?: Date
}

function dateToCalendarDate(date?: Date | string | number | null): CalendarDate | undefined {
  date = getDate(date)
  if(!date) return undefined
  return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

export const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ value, onChange, label, maxDate, minDate, className = "", error, required }, ref) => {

    const [calendarValue, setCalendarValue] = React.useState<CalendarDate | undefined | null>(null)

    React.useEffect(() => {
      setCalendarValue(dateToCalendarDate(value))
    }, [value])

    return (
      <I18nProvider locale="ES">
        <DatePicker
          label={label && <Label className="font-semibold mb-1" text={label} required={required} />}
          className={`${className} text-zinc-300 w-full rounded focus:outline-0 my-2`}
          variant="bordered"
          dateInputClassNames={{ inputWrapper: "border-1 border-input hover:border-1 hover:border-input px-2 py-1" }}
          showMonthAndYearPickers
          isInvalid={!!error}
          errorMessage={(value) => {
            if (value.isInvalid) {
              return error
            }
          }}
          maxValue={dateToCalendarDate(maxDate)}
          minValue={dateToCalendarDate(minDate)}
          value={calendarValue}
          onChange={(calendarDate: CalendarDate | null) => {
            setCalendarValue(calendarDate)
          }}
          onBlur={()=>{
            calendarValue && calendarValue.year.toString().length >= 4 ? onChange(new Date(calendarValue.year, calendarValue.month - 1, calendarValue.day)) : onChange(null)
          }}
          labelPlacement="outside"
          ref={ref}
        />
      </I18nProvider>
    )
  }
)

DateInput.displayName = "DateInput"
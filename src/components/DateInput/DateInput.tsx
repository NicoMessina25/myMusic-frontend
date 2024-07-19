 

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

function dateToCalendarDate(date?: Date | string | number | null): CalendarDate | undefined {
  if(!date) return undefined
  return parseDate(toISOString(date) ?? "");
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
            calendarDate ? onChange(new Date(calendarDate.year, calendarDate.month - 1, calendarDate.day)) : onChange(undefined)
          }}
          labelPlacement="outside"
          ref={ref}
        />
      </I18nProvider>
    )
  }
)

DateInput.displayName = "DateInput"
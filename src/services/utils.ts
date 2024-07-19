import { format, FormatDateOptions, FormatOptions } from "date-fns";

export function toISOString(date?: Date | number | string | null, time?:boolean): string | null {
    date = getDate(date)
    if (!date) return null;    

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son 0-indexados
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');

    // Concatenación manual de los componentes de la fecha
    return `${year}-${month}-${day}` + (time ? `T${hours}:${minutes}:${seconds}.${milliseconds}`:"");
}

/* export function seconds2time(seconds?: number | null): string {
    if (!seconds) return "";

    const hours = seconds >= 3600 ? Math.floor(seconds / 3600).toString().padStart(2, '0') + ":" : "";
    const minutes = hours || seconds >= 60 ? Math.floor((seconds % 3600) / 60).toString().padStart(2, '0') + ":": "" ;
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');

    return `${hours}${minutes}${remainingSeconds}`;
} */

export function getDate(date?: string | number | Date | null): Date | null {
    if(!date) return null
    return typeof date === "string" && !date.includes("T") ? new Date(date + "T00:00:00.000") : new Date(date)
}

export function formatDate(date: Date | null, formatStr: string, options?: FormatDateOptions): string{ 
    if(!date) return ""
    return format(date, formatStr, options)
}

export const getSecondsFromHHMMSS = (value:string) => {
    const [str1, str2, str3] = value.split(":");

    const val1 = Number(str1);
    const val2 = Number(str2);
    const val3 = Number(str3);

    if (!isNaN(val1) && isNaN(val2) && isNaN(val3)) {
    // seconds
    return val1;
    }

    if (!isNaN(val1) && !isNaN(val2) && isNaN(val3)) {
    // minutes * 60 + seconds
    return val1 * 60 + val2;
    }

    if (!isNaN(val1) && !isNaN(val2) && !isNaN(val3)) {
    // hours * 60 * 60 + minutes * 60 + seconds
    return val1 * 60 * 60 + val2 * 60 + val3;
    }

    return 0;
};

export const toHHMMSS = (secs?: number | null): string => {
    if(!secs) return ""

    const secNum = parseInt(secs.toString(), 10);
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor(secNum / 60) % 60;
    const seconds = secNum % 60;

    return [hours, minutes, seconds]
    .map((val) => (val < 10 ? `0${val}` : val))
    .filter((val, index) => val !== "00" || index > 0)
    .join(":")
    .replace(/^0/, "");
};
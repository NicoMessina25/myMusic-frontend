import { format, FormatDateOptions, FormatOptions } from "date-fns";

export function toISOString(date?: Date | null, time?:boolean): string | null {
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

export function seconds2time(seconds?: number | null): string {
    if (!seconds) return "";

    const hours = seconds >= 3600 ? Math.floor(seconds / 3600).toString().padStart(2, '0') + ":" : "";
    const minutes = hours || seconds >= 60 ? Math.floor((seconds % 3600) / 60).toString().padStart(2, '0') + ":": "" ;
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');

    return `${hours}${minutes}${remainingSeconds}`;
}

export function getDate(date?: string | number | Date | null): Date | null {
    if(!date) return null
    return typeof date === "string" && !date.includes("T") ? new Date(date + "T00:00:00.000") : new Date(date)
}

export function formatDate(date: Date | null, formatStr: string, options?: FormatDateOptions): string{ 
    if(!date) return ""
    return format(date, formatStr, options)
}
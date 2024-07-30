import { ColorPallette } from "./color"

export enum EAlertType {
    INFO,
    WARNING,
    ERROR,
    SUCCESS
}
  
interface IAlert {
    message?:string,
    color?:keyof ColorPallette
    title:string,
    icon?:string
}

export type {IAlert}
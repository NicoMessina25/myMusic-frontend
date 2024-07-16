import { Label as LabelShadcn } from "../../ui/label"

interface LabelProps{
    text?:string,
    htmlFor?:string,
    required?:boolean,
    className?:string
}

export function Label({htmlFor, text = "", required,className=""}:Readonly<LabelProps>) {
  return <LabelShadcn htmlFor={htmlFor} className={`text-rickMortyLight ${className}`}>{text} {required ? <span>*</span>:<></>}</LabelShadcn>


}

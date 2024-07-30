export interface ColorPallette {
    [key: string]:Color
    cyan: Color,
    red: Color,
    lime: Color,
    yellow: Color
}
  
export interface Color {
    bg: string,
    text800:string
    text700:string
    border:string
  }
  
export const colors:ColorPallette = {
    cyan: {
      bg: "bg-cyan-300",
      text700: "text-cyan-700",
      text800: "text-cyan-800",
      border: "border-cyan-600"
    },
    red: {
      bg: "bg-red-300",
      text700: "text-red-700",
      text800: "text-red-800",
      border: "border-red-600"
    },
    yellow: {
      bg: "bg-yellow-300",
      text700: "text-yellow-700",
      text800: "text-yellow-800",
      border: "border-yellow-600"
    },
    lime: {
      bg: "bg-lime-300",
      text700: "text-lime-700",
      text800: "text-lime-800",
      border: "border-lime-600"
    },
  }
  
import AlertContainer from "@/components/Alert/AlertContainer";
import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";
import WindowLoader from "@/components/WindowLoader/WindowLoader";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return <ThemeProvider
    attribute="class"
    defaultTheme="dark"
    enableSystem
    disableTransitionOnChange
  >
     <Provider store={store}>
        <Component {...pageProps} />
        <AlertContainer/>
        <WindowLoader/>
    </Provider>
  </ThemeProvider>
}

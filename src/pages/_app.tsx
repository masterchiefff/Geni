import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { store } from '@/store/store';

import { Montserrat as FontSans } from "next/font/google";
import { cn } from "@/lib/utils"; 
import "@/styles/globals.css"; 

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",  
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className={cn(fontSans.className)}>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

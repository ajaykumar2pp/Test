import { Geist, Geist_Mono, Open_Sans } from "next/font/google";
import TopLoader from "@/components/TopLoader";
import Providers from "@/app/providers";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import {Inter} from "next/font/google";
import "./globals.css";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Resume Analyzer",
  description:
    "A resume analyzing tool that provides insights and suggestions to improve your resume.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`} suppressHydrationWarning
    >
      <body> 
        <TopLoader />
        <Providers>
          <TooltipProvider>
            <main>{children}</main>
          </TooltipProvider>
          <Toaster position="top-right" richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}

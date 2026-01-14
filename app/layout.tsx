import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import { Atkinson_Hyperlegible, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import Header from "@/components/Header";

const atkinson = Atkinson_Hyperlegible({
    subsets: ["latin"],
    variable: "--font-atkinson",
    weight: ["400", "700"],
});

const instrumentSerif = Instrument_Serif({
    subsets: ["latin"],
    variable: "--font-instrument-serif",
    weight: ["400"],
});
const lastik = localFont({
    variable: "--font-lastik",
    src: "./fonts/LastikVariable-Variable.woff2",
    display: "swap",
    weight: "50 100",
});

export const metadata: Metadata = {
    title: "Creative Tech Stack",
    description: "",
};

import { ThemeProvider } from "@/components/ThemeProvider";



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="m-0 p-0" suppressHydrationWarning>
            <body
                className={`${atkinson.className} ${lastik.variable} ${instrumentSerif.variable}  font-sans antialiased m-0 p-0`}
            >
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <Header />
                    {children}
                    <Analytics />
                </ThemeProvider>
            </body>
        </html>
    );
}

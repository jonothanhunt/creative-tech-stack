import type { Metadata } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const atkinson = Atkinson_Hyperlegible({
    subsets: ["latin"],
    variable: "--font-atkinson",
    weight: ["400", "700"],
});

const lastik = localFont({
    variable: "--font-lastik",
    src: "./fonts/LastikVariable-Variable.woff2",
    display: "swap",
    weight: "50 100",
});

export const metadata: Metadata = {
    title: "Creative Tech Newsletter",
    description: "Exploring the intersection of creativity and technology",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${atkinson.className} ${lastik.variable} font-sans antialiased`}
            >
                {children}
            </body>
        </html>
    );
}

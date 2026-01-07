"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ThemeToggle } from "./ThemeToggle";

export default function Nav() {
    const pathname = usePathname();
    const navRef = useRef<HTMLElement>(null);
    const [isStuck, setIsStuck] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (navRef.current) {
                const rect = navRef.current.getBoundingClientRect();
                setIsStuck(rect.top <= 0);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            ref={navRef}
            className="flex flex-row flex-wrap justify-between items-center text-3xl sm:text-3xl h-12 border-y-2 border-ct-primary"
        >
            <div
                className={`transition-all h-full duration-500 hidden sm:inline -ml-1 border-r-2 border-ct-primary overflow-hidden ${isStuck ? "w-full sm:w-70" : "w-0"
                    }`}
            >
                <h1
                    className={`min-w-70 whitespace-nowrap px-auto pt-[0.38rem] font-lastik font-[50]  transition-[color,background-color] flex items-center justify-center`}
                >
                    Creative Tech Stack
                </h1>
            </div>
            <Link
                href="/"
                className={`flex-1 h-full py-2 px-2 font-instrument uppercase transition-[color,background-color] flex items-center justify-center ${pathname === "/"
                    ? "text-ct-secondary bg-ct-primary"
                    : "text-ct-primary"
                    } hover:text-ct-secondary hover:bg-ct-primary`}
            >
                Newsletter
            </Link>
            <Link
                href="/lists"
                className={` flex-1 h-full py-2 px-2 font-instrument uppercase transition-[color,background-color] flex items-center justify-center ${pathname === "/lists"
                    ? "text-ct-secondary bg-ct-primary"
                    : "text-ct-primary"
                    } hover:text-ct-secondary hover:bg-ct-primary`}
            >
                Lists
            </Link>
            <ThemeToggle className="hidden sm:flex" />
        </nav>
    );
}

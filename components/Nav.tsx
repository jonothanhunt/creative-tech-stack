"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
    const pathname = usePathname();
    return (
        <nav className="flex flex-row flex-wrap justify-between text-4xl sm:text-4xl border-t-2 border-y-ct-primary divide-ct-primary divide">
            <Link
                href="/"
                className={`flex-1 h-full py-2 font-instrument uppercase transition-[color,background-color] flex items-center justify-center ${
                    pathname === "/"
                        ? "text-ct-secondary bg-ct-primary"
                        : "text-ct-primary"
                } hover:text-ct-secondary hover:bg-ct-primary`}
            >
                Newsletter
            </Link>
            <Link
                href="/lists"
                className={` flex-1 h-full py-2 font-instrument uppercase transition-[color,background-color] flex items-center justify-center ${
                    pathname === "/lists"
                        ? "text-ct-secondary bg-ct-primary"
                        : "text-ct-primary"
                } hover:text-ct-secondary hover:bg-ct-primary`}
            >
                Lists
            </Link>
        </nav>
    );
}

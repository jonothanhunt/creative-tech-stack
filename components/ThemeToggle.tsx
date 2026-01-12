"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { IoMoon, IoSunny } from "react-icons/io5";

export function ThemeToggle({ className = "" }: { className?: string }) {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const [systemTheme, setSystemTheme] = React.useState<"light" | "dark">("dark");

    React.useEffect(() => {
        setMounted(true);

        // Detect system theme
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setSystemTheme(mediaQuery.matches ? "dark" : "light");

        const handler = (e: MediaQueryListEvent) => {
            setSystemTheme(e.matches ? "dark" : "light");
        };

        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    // Prevent hydration mismatch by rendering a placeholder with same dimensions
    if (!mounted) {
        return (
            <div className={`h-full aspect-square border-l-2 border-ct-primary flex items-center justify-center ${className}`}>

            </div>
        );
    }

    const cycleTheme = () => {
        if (theme === "system") {
            // From system, go to the opposite of system
            setTheme(systemTheme === "dark" ? "light" : "dark");
        } else {
            // From manual mode, check if we're on the opposite of system
            const isOppositeOfSystem =
                (systemTheme === "dark" && theme === "light") ||
                (systemTheme === "light" && theme === "dark");

            if (isOppositeOfSystem) {
                // We're on opposite manual, go to same as system manual
                setTheme(systemTheme);
            } else {
                // We're on same as system manual, go back to system
                setTheme("system");
            }
        }
    };

    const isSystemMode = theme === "system";
    const isDark = resolvedTheme === "dark";

    return (
        <button
            onClick={cycleTheme}
            className={`h-full aspect-square flex-shrink-0 flex items-center justify-center text-ct-primary hover:bg-ct-primary hover:text-ct-secondary transition-[color,background-color] border-l-2 border-ct-primary ${className} relative`}
            aria-label="Toggle Theme"
        >
            {isDark ? <IoMoon size={24} /> : <IoSunny size={24} />}
            {isSystemMode && (
                <span className="absolute top-1 left-1 text-[10px] font-sans font-bold leading-none">
                    A
                </span>
            )}
        </button>
    );
}

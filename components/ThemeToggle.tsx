"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { IoMoon, IoSunny } from "react-icons/io5";

export function ThemeToggle({ className = "" }: { className?: string }) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent hydration mismatch by rendering a placeholder with same dimensions
    if (!mounted) {
        return (
            <div className={`h-full aspect-square border-l-2 border-ct-primary flex items-center justify-center ${className}`}>
                {/* Optional: Render non-interactive icon default or empty */}
            </div>
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`h-full aspect-square flex-shrink-0 flex items-center justify-center text-ct-primary hover:bg-ct-primary hover:text-ct-secondary transition-[color,background-color] border-l-2 border-ct-primary ${className}`}
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? <IoSunny size={24} /> : <IoMoon size={24} />}
        </button>
    );
}

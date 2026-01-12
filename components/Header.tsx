"use client";

import { useRef, useEffect } from "react";
import VariableProximity from "./VariableProximity";
import HeaderCanvas from "./HeaderCanvas";
import { usePathname } from "next/navigation";

export default function Header() {
    const containerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        containerRef.current = document.body;
    }, []);

    const pathname = usePathname();

    if (pathname === "/" || pathname?.startsWith("/tools")) {
        return (
            <div className="bg-ct-secondary">
                <header className="relative shadow-sm pt-10 pb-6 mix-blend-normal">
                    <div className="z-10 absolute inset-0 opacity-50 md:opacity-100 flex justify-end">
                        <div className="w-full max-w-7xl relative h-full">
                            <HeaderCanvas />
                        </div>
                    </div>
                    <div className="flex flex-col ml-4">
                        <div className="font-lastik text-7xl sm:text-8xl leading-[80%] font-[50] flex">
                            <VariableProximity
                                label="Creative"
                                fromFontVariationSettings="'wght' 50"
                                toFontVariationSettings="'wght' 100"
                                containerRef={containerRef}
                                className="whitespace-nowrap tracking-tight"
                            />
                        </div>
                        <div className="font-lastik text-7xl sm:text-8xl leading-[80%] font-[50] flex gap-4 items-center">
                            <VariableProximity
                                label="Tech"
                                fromFontVariationSettings="'wght' 50"
                                toFontVariationSettings="'wght' 100"
                                containerRef={containerRef}
                                className="whitespace-nowrap tracking-tight"
                            />
                        </div>
                        <div className="font-lastik text-7xl sm:text-8xl leading-[80%] font-[50] flex gap-4 items-center">
                            <VariableProximity
                                label="Stack"
                                fromFontVariationSettings="'wght' 50"
                                toFontVariationSettings="'wght' 100"
                                containerRef={containerRef}
                                className="whitespace-nowrap tracking-tight"
                            />
                        </div>
                    </div>
                </header>
            </div>
        );
    } else {
        return null;
    }
}


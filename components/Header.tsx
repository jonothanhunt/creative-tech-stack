"use client";

import { useRef, useEffect } from "react";
import VariableProximity from "./VariableProximity";
// import ScrambledText from "./ScrambledText";
// import MagnetLines from "./MagnetLines";
import HeaderCanvas from "./HeaderCanvas";
import { usePathname } from "next/navigation";
// import Link from "next/link";

export default function Header() {
    const containerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        containerRef.current = document.body;
    }, []);

    const pathname = usePathname();

    if (pathname === "/" || pathname === "/lists") {
        return (
            <div className="bg-ct-secondary">
                <header className="relative shadow-sm pt-10 pb-6 mix-blend-normal">
                    <div className="z-10 absolute inset-0 opacity-40 md:opacity-100">
                        <HeaderCanvas />
                    </div>
                    <div className="flex flex-col ml-4">
                        <div className="font-lastik text-7xl sm:text-8xl leading-[80%] font-[50] flex">
                            {/* <div className="bg-ct-primary w-26 h-26 rounded-full -mt-5" /> */}
                            <VariableProximity
                                label="Creative"
                                fromFontVariationSettings="'wght' 50"
                                toFontVariationSettings="'wght' 100"
                                containerRef={containerRef}
                                className="whitespace-nowrap tracking-tight"
                            />
                            {/* <ScrambledText className="whitespace-nowrap tracking-tight">Creative</ScrambledText> */}
                        </div>
                        <div className="font-lastik text-7xl sm:text-8xl leading-[80%] font-[50] flex gap-4 items-center">
                            <VariableProximity
                                label="Tech"
                                fromFontVariationSettings="'wght' 50"
                                toFontVariationSettings="'wght' 100"
                                containerRef={containerRef}
                                className="whitespace-nowrap tracking-tight"
                            />
                            {/* <ScrambledText className="whitespace-nowrap tracking-tight">Tech</ScrambledText> */}
                        </div>
                        <div className="font-lastik text-7xl sm:text-8xl leading-[80%] font-[50] flex gap-4 items-center">
                            <VariableProximity
                                label="Stack"
                                fromFontVariationSettings="'wght' 50"
                                toFontVariationSettings="'wght' 100"
                                containerRef={containerRef}
                                className="whitespace-nowrap tracking-tight"
                            />
                            {/* <ScrambledText className="whitespace-nowrap tracking-tight">Stack</ScrambledText> */}
                        </div>
                    </div>
                </header>
            </div>
        );
    } else {
        return null;
    }
}

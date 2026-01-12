"use client";

import React from "react";

interface StickyHeaderProps {
    title: string;
    date: string;
    author?: string;
}

export default function StickyHeader({ title, date, author }: StickyHeaderProps) {
    return (
        <div
            className="sticky top-0 z-40 flex flex-row flex-wrap gap-x-6 gap-y-0 justify-between text-3xl sm:text-3xl md:text-3xl border-b-2 border-ct-primary py-2 px-2 divide-ct-primary bg-ct-secondary transition-all duration-300"
        >
            <h1 className="w-fit font-instrument text-ct-primary text-balance">
                {title}
                {author && (
                    <span className="ml-3 opacity-50 font-normal">
                        {author}
                    </span>
                )}
            </h1>
            <time className="font-instrument uppercase text-ct-primary whitespace-nowrap">
                {date}
            </time>
        </div>
    );
}

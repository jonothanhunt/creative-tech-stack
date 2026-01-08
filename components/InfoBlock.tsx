import React from "react";

interface InfoBlockProps {
    children: React.ReactNode;
}

export default function InfoBlock({ children }: InfoBlockProps) {
    return (
        <div className="my-8 py-6 border-y-2 border-dotted border-ct-primary text-center italic text-lg text-balance opacity-80 max-w-2xl mx-auto">
            {children}
        </div>
    );
}

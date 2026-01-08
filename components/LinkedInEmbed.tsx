"use client";

import React from "react";

interface LinkedInEmbedProps {
    url: string;
    mode?: "video" | "compact" | "full";
    title?: string;
    height?: number;
}

export default function LinkedInEmbed({
    url,
    mode = "full",
    title = "Embedded post",
    height
}: LinkedInEmbedProps) {

    const postUrn = React.useMemo(() => {
        if (url) {
            // Try to find the urn:li:... part in the URL
            const match = url.match(/(urn:li:[a-zA-Z]+:\d+)/);
            if (match) return match[1];
        }
        return null;
    }, [url]);

    if (!postUrn) return null;

    let src = `https://www.linkedin.com/embed/feed/update/${postUrn}`;
    let defaultHeight = 781;

    if (mode === "video") {
        src += "?compact=1";
        defaultHeight = 399;
    } else if (mode === "compact") {
        src += "?collapsed=1";
        defaultHeight = 550;
    }

    const finalHeight = height || defaultHeight;
    const isVideo = mode === "video";

    return (
        <div
            className={`relative w-full my-8 border-2 border-ct-primary bg-white overflow-hidden ${isVideo ? "aspect-video" : ""}`}
            style={!isVideo ? { height: finalHeight } : undefined}
        >
            <iframe
                src={src}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allowFullScreen
                title={title}
            />
        </div>
    );
}

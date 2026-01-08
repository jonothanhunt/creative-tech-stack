"use client";

import React from "react";

interface VimeoEmbedProps {
    url: string;
    title?: string;
}

export default function VimeoEmbed({ url, title = "Vimeo video player" }: VimeoEmbedProps) {
    // Extract video ID, optional hash (h parameter), and time anchor (t parameter)
    const embedSrc = React.useMemo(() => {
        if (!url) return null;

        // Match standard vimeo.com/ID and player.vimeo.com/video/ID
        // Capture optional hash ?h=
        // Capture optional time #t=
        const match = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([0-9]+)(?:.*[?&]h=([a-z0-9]+))?(?:.*[#&?]t=([a-z0-9]+))?/);

        if (match) {
            const id = match[1];
            const hash = match[2];
            // match[3] might catch just '1m45s' if we use the right regex group, but URLs can be complex.
            // Let's use a simpler URL object parsing approach for robustness if possible, but regex is fine for now.
            // Re-parsing the input URL to get the hash directly is safer for the time param.

            let timeParam = '';
            try {
                // Handle partial URLs or full URLs
                const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
                if (urlObj.hash && urlObj.hash.includes('t=')) {
                    timeParam = urlObj.hash; // e.g. #t=1m45s
                }
            } catch {
                // fallback if URL parsing fails
            }

            let src = `https://player.vimeo.com/video/${id}`;
            const params = new URLSearchParams();

            if (hash) params.set('h', hash);
            params.set('title', '0');
            params.set('byline', '0');
            params.set('portrait', '0');

            src += `?${params.toString()}`;
            if (timeParam) {
                src += timeParam;
            }

            return src;
        }
        return null;
    }, [url]);

    if (!embedSrc) return null;

    return (
        <div className="relative w-full aspect-video my-8 overflow-hidden border-2 border-ct-primary bg-black">
            <iframe
                src={embedSrc}
                className="absolute top-0 left-0 w-full h-full"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ backgroundColor: 'black' }}
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                allowFullScreen
                title={title}
            />
        </div>
    );
}

"use client";

import React from "react";

interface YouTubeEmbedProps {
    url: string;
    title?: string;
}

export default function YouTubeEmbed({ url, title = "YouTube video player" }: YouTubeEmbedProps) {
    const { videoId, startTime } = React.useMemo(() => {
        if (url) {
            const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
            const id = match ? match[1] : null;

            // Extract start time
            let time: string | null = null;
            try {
                const urlObj = new URL(url);
                const params = new URLSearchParams(urlObj.search);
                time = params.get("t") || params.get("start");
            } catch {
                // Fallback regex if URL parsing fails
                const tMatch = url.match(/[?&](?:t|start)=([^&]+)/);
                if (tMatch) time = tMatch[1];
            }

            // Normalize time
            // 't' can be '1m30s' or just seconds. Embed param 'start' expects seconds.

            if (time) {
                // If time is just numbers, it's already in seconds
                if (!/^\d+$/.test(time)) {
                    // Parse 1h2m3s format
                    let totalSeconds = 0;
                    const h = time.match(/(\d+)h/);
                    const m = time.match(/(\d+)m/);
                    const s = time.match(/(\d+)s/);

                    if (h) totalSeconds += parseInt(h[1], 10) * 3600;
                    if (m) totalSeconds += parseInt(m[1], 10) * 60;
                    if (s) totalSeconds += parseInt(s[1], 10);

                    // Only update time if we found something meaningful
                    if (h || m || s) {
                        time = totalSeconds.toString();
                    }
                }
            }

            return { videoId: id, startTime: time };
        }
        return { videoId: null, startTime: null };
    }, [url]);

    const [src, setSrc] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        if (videoId) {
            let baseSrc = `https://www.youtube.com/embed/${videoId}?color=white&playsinline=1&widget_referrer=${window.location.href}`;
            if (startTime) {
                baseSrc += `&start=${startTime}`;
            }
            setSrc(baseSrc);
        }
    }, [videoId, startTime]);

    if (!videoId) return null;

    return (
        <div className="relative w-full aspect-video my-8 overflow-hidden border-2 border-ct-primary">
            <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={src}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
            />
        </div>
    );
}

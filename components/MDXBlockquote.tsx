"use client";

import React from "react";
import {
    TfiInfoAlt,
    TfiLightBulb,
    TfiAlert,
    TfiThought,
    TfiClose,
} from "react-icons/tfi";

interface MDXBlockquoteProps {
    children?: React.ReactNode;
}

type AlertType = "NOTE" | "TIP" | "IMPORTANT" | "WARNING" | "CAUTION";

const ALERT_CONFIG: Record<
    AlertType,
    {
        icon: React.ReactNode;
        colorClass: string;
        bgClass: string;
        borderColorClass: string;
        title: string;
    }
> = {
    NOTE: {
        icon: <TfiInfoAlt />,
        colorClass: "text-blue-400",
        bgClass: "bg-blue-500/10",
        borderColorClass: "border-blue-400",
        title: "Note",
    },
    TIP: {
        icon: <TfiLightBulb />,
        colorClass: "text-green-400",
        bgClass: "bg-green-500/10",
        borderColorClass: "border-green-400",
        title: "Tip",
    },
    IMPORTANT: {
        icon: <TfiThought />,
        colorClass: "text-purple-400",
        bgClass: "bg-purple-500/10",
        borderColorClass: "border-purple-400",
        title: "Important",
    },
    WARNING: {
        icon: <TfiAlert />,
        colorClass: "text-yellow-400",
        bgClass: "bg-yellow-500/10",
        borderColorClass: "border-yellow-400",
        title: "Warning",
    },
    CAUTION: {
        icon: <TfiClose />,
        colorClass: "text-red-400",
        bgClass: "bg-red-500/10",
        borderColorClass: "border-red-400",
        title: "Caution",
    },
};

export default function MDXBlockquote({ children }: MDXBlockquoteProps) {
    // Try to inspect children to see if it starts with an alert tag
    let alertType: AlertType | null = null;
    let content = children;

    // MDX usually passes a <p> as the first child of blockquote
    // We need to check if that <p>'s children is a string starting with [!TYPE]
    const childrenArray = React.Children.toArray(children);
    const firstChild = childrenArray[0];

    if (
        React.isValidElement(firstChild) &&
        firstChild.type === "p" &&
        (firstChild.props as { children?: React.ReactNode }).children
    ) {
        const pChildren = React.Children.toArray((firstChild.props as { children?: React.ReactNode }).children);
        const firstText = pChildren[0];

        if (typeof firstText === "string") {
            const match = firstText.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/);
            if (match) {
                alertType = match[1] as AlertType;

                // Remove the [!TYPE] tag and potentially the newline/space after it
                const newFirstText = firstText.replace(
                    /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/,
                    ""
                );

                // Reconstruct the paragraph content
                const newPChildren = [...pChildren];
                newPChildren[0] = newFirstText;

                // Replace the first child <p> with our modified version
                const newFirstChild = React.cloneElement(
                    firstChild as React.ReactElement<unknown>,
                    {},
                    ...newPChildren
                );

                const newChildrenArray = [...childrenArray];
                newChildrenArray[0] = newFirstChild;
                content = newChildrenArray;
            }
        }
    }

    if (alertType) {
        const config = ALERT_CONFIG[alertType];
        return (
            <div
                className={`my-6 rounded-r-lg border-l-4 p-4 ${config.bgClass} ${config.borderColorClass} text-balance`}
            >
                <div className={`flex items-center gap-2 mb-2 font-bold ${config.colorClass}`}>
                    <span className="text-xl">{config.icon}</span>
                    <span className="uppercase tracking-wider text-sm font-sans">
                        {config.title}
                    </span>
                </div>
                <div className="text-ct-primary opacity-90  [&>p]:mb-0">
                    {content}
                </div>
            </div>
        );
    }

    // Default blockquote style
    return (
        <blockquote className="border-l-4 border-ct-primary pl-4 italic text-ct-primary mb-4 opacity-80 text-balance">
            {children}
        </blockquote>
    );
}

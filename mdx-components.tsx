import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
    h1: ({ children }) => (
        <h1 className="mt-10 text-5xl font-lastik font-[60] mb-4 text-ct-secondary">
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <h2 className="mt-10 text-4xl font-lastik font-[50] mb-3 text-ct-secondary">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className="text-2xl font-medium mb-2 text-gray-700">
            {children}
        </h3>
    ),
    p: ({ children }) => (
        <p className="text-lg mb-4 text-ct-secondary leading-relaxed">{children}</p>
    ),
    a: ({ children, href }) => (
        <a
            className="text-ct-secondary underline-offset-4 hover:text-blue-800 underline"
            href={href}
        >
            {children}
        </a>
    ),
    ul: ({ children }) => (
        <ul className="text-lg list-disc list-inside mb-4 text-ct-secondary">
            {children}
        </ul>
    ),
    ol: ({ children }) => (
        <ol className="text-lg list-decimal list-inside mb-4 text-ct-secondary">
            {children}
        </ol>
    ),
    li: ({ children }) => <li className="mb-1">{children}</li>,
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 mb-4">
            {children}
        </blockquote>
    ),
    code: ({ children }) => (
        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
            {children}
        </code>
    ),
    pre: ({ children }) => (
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto mb-4">
            {children}
        </pre>
    ),
};

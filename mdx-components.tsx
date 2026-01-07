import type { MDXComponents } from "mdx/types";
import SubscribeForm from "@/components/SubscribeForm";

export const mdxComponents: MDXComponents = {
    SubscribeForm: () => (
        <div className="not-prose mt-12 w-screen relative left-1/2 -translate-x-1/2">
            <SubscribeForm />
        </div>
    ),
    h1: ({ children }) => (
        <h1 className="mt-10 text-5xl font-lastik font-[60] mb-4 text-ct-primary text-balance">
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <h2 className="mt-10 text-4xl font-lastik font-[50] mb-3 text-ct-primary text-balance">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className="text-2xl font-medium mb-2 text-ct-primary text-balance">
            {children}
        </h3>
    ),
    p: ({ children }) => (
        <p className="text-lg mb-4 text-ct-primary leading-relaxed">{children}</p>
    ),
    a: ({ children, href }) => (
        <a
            className="text-ct-primary underline-offset-4 hover:bg-ct-primary hover:text-ct-secondary underline transition-colors"
            href={href}
        >
            {children}
        </a>
    ),
    ul: ({ children }) => (
        <ul className="text-lg list-disc list-inside mb-4 text-ct-primary">
            {children}
        </ul>
    ),
    ol: ({ children }) => (
        <ol className="text-lg list-decimal list-inside mb-4 text-ct-primary">
            {children}
        </ol>
    ),
    li: ({ children }) => <li className="mb-1">{children}</li>,
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-ct-primary pl-4 italic text-ct-primary mb-4">
            {children}
        </blockquote>
    ),
    code: ({ children }) => (
        <code className="bg-ct-primary text-ct-secondary px-1 py-0.5 rounded text-sm font-mono">
            {children}
        </code>
    ),
    pre: ({ children }) => (
        <pre className="bg-ct-primary text-ct-secondary p-4 rounded overflow-x-auto mb-4">
            {children}
        </pre>
    ),
};

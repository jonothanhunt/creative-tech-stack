import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-4xl font-bold mb-4 text-gray-900">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-semibold mb-3 text-gray-800">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-medium mb-2 text-gray-700">{children}</h3>,
    p: ({ children }) => <p className="mb-4 text-gray-600 leading-relaxed">{children}</p>,
    a: ({ children, href }) => <a className="text-blue-600 hover:text-blue-800 underline" href={href}>{children}</a>,
    ul: ({ children }) => <ul className="list-disc list-inside mb-4 text-gray-600">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside mb-4 text-gray-600">{children}</ol>,
    li: ({ children }) => <li className="mb-1">{children}</li>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 mb-4">{children}</blockquote>,
    code: ({ children }) => <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
    pre: ({ children }) => <pre className="bg-gray-100 p-4 rounded overflow-x-auto mb-4">{children}</pre>,
    ...components,
  }
}
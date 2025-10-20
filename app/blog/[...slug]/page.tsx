import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

export default async function BlogPost({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const slugStr = slug.join('/')
  const filePath = path.join(process.cwd(), 'posts', `${slugStr}.mdx`)

  if (!fs.existsSync(filePath)) {
    notFound()
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { content, data } = matter(fileContents)

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{data.title}</h1>
          <p className="text-lg text-gray-600 mb-2">{data.description}</p>
          <time className="text-sm text-gray-500">{data.date}</time>
        </header>
        <div className="prose prose-lg max-w-none">
          <MDXRemote source={content} />
        </div>
      </article>
    </div>
  )
}
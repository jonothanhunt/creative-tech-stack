import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

const postsDirectory = path.join(process.cwd(), "posts");

function getPosts() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);
        return {
            slug,
            ...matterResult.data,
        } as {
            slug: string;
            title: string;
            date: string;
            description: string;
        };
    });
    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default function Home() {
    const posts = getPosts();

    return (
        <div className="min-h-screen">
            <header className=" shadow-sm">
                <div className="max-w-7xl">
                    <h1 className="font-lastik text-[min(20vw,10rem)] leading-[min(20vw,10rem)] font-[50] text-brown-900">
                        Creative
                        <br />
                        Tech
                        <br />
                        Newsletter
                    </h1>
                    {/* <p className="mt-2 text-lg text-gray-600">
                        Exploring the intersection of creativity and technology
                    </p> */}
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    Latest Posts
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <article
                            key={post.slug}
                            className="bg-white rounded-lg shadow-md p-6"
                        >
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="hover:text-blue-600"
                                >
                                    {post.title}
                                </Link>
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {post.description}
                            </p>
                            <time className="text-sm text-gray-500">
                                {post.date}
                            </time>
                        </article>
                    ))}
                </div>
            </main>
        </div>
    );
}

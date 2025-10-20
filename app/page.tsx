import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Nav from "@/components/Nav";

const postsDirectory = path.join(process.cwd(), "posts");

function formatDate(dateString: string): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const postDate = new Date(dateString + "T00:00:00");
    const diffDays = Math.floor(
        (today.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "TODAY";
    if (diffDays === 1) return "1 DAY AGO";
    if (diffDays <= 6) return `${diffDays} DAYS AGO`;
    if (diffDays <= 13) return "LAST WEEK";
    return dateString;
}

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
        <div className="">
            <div className="sticky top-0 mix-blend-color-dodge">
                <Nav />
            </div>
            <main className="w-full">
                <div className="mix-blend-color-dodge">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/newsletter/${post.slug}`}
                            className="group"
                        >
                            <article className=" hover:bg-ct-primary flex flex-col sm:flex-row sm:gap-6 justify-between text-4xl sm:text-5xl md:text-6xl border-y-2 py-2 transition-[padding,background-color] duration-1000 group-hover:duration-100 border-y-ct-primary divide-ct-primary divide">
                                <h3 className="w-fit font-instrument uppercase transition-colors text-ct-primary group-hover:text-ct-secondary">
                                    {post.title}
                                </h3>
                                <time className="font-instrument uppercase transition-colors text-ct-primary group-hover:text-ct-secondary">
                                    {formatDate(post.date)}
                                </time>
                                {/* <div className="flex-1 flex-col justify-between">
                                <p className="">{post.description}</p>
                            </div> */}
                            </article>
                        </Link>
                    ))}
                </div>
            </main>
            <footer className="py-4 text-center text-sm text-ct-primary">
                Written by{" "}
                <Link href="https://jonothan.dev">Jonothan Hunt</Link>
            </footer>
        </div>
    );
}

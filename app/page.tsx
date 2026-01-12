import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Nav from "@/components/Nav";
import SubscribeForm from "@/components/SubscribeForm";
import Footer from "@/components/Footer";
import React from "react";

const postsDirectory = path.join(process.cwd(), "posts");

import { formatDate } from "@/lib/utils";

export const revalidate = 3600; // Revalidate every hour


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
        <div className="bg-ct-secondary min-h-screen">
            <div className="sticky top-0 z-10 bg-ct-secondary/90 backdrop-blur-2xl">
                <Nav />
            </div>
            <main className="w-full">
                <div className="">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/newsletter/${post.slug}`}
                            className="group"
                        >
                            <article className=" hover:bg-ct-primary flex flex-col sm:flex-row sm:gap-6 justify-between text-3xl sm:text-4xl md:text-4xl border-b-2 py-2 px-2 transition-[padding,background-color] duration-1000 group-hover:duration-100 border-y-ct-primary divide-ct-primary divide">
                                <h3 className="w-fit font-instrument transition-colors text-ct-primary group-hover:text-ct-secondary text-balance">
                                    {post.title}
                                </h3>
                                <time className="font-instrument uppercase transition-colors text-ct-primary group-hover:text-ct-secondary">
                                    {formatDate(post.date)}
                                </time>
                            </article>
                        </Link>
                    ))}
                    <div className="mt-14">
                        <SubscribeForm />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

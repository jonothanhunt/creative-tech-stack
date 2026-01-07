import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/mdx-components";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TfiArrowLeft } from "react-icons/tfi";
import { ThemeToggle } from "@/components/ThemeToggle";

// ... existing imports

export default async function BlogPost({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}) {
    const { slug } = await params;
    const slugStr = slug.join("/");
    const filePath = path.join(process.cwd(), "posts", `${slugStr}.mdx`);

    if (!fs.existsSync(filePath)) {
        notFound();
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(fileContents);

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

    return (
        <div className="h-screen max-h-screen grid grid-cols-1 grid-rows-[auto_1fr] bg-ct-secondary">
            <header className="mix-blend-normal">
                {/* Top Bar: Back | Title | Toggle */}
                <div className="flex flex-row justify-between text-3xl sm:text-3xl md:text-3xl border-b-2 border-ct-primary h-12">
                    <Link
                        href="/"
                        className="group hover:bg-ct-primary flex flex-row gap-2 items-center py-2 px-2 transition-[background-color] duration-200 border-r-2 border-ct-primary"
                    >
                        <div className="w-fit font-instrument whitespace-nowrap transition-colors text-ct-primary group-hover:text-ct-secondary">
                            <TfiArrowLeft className="inline-block -ml-1 -mt-[0.4rem] h-6" />
                            Back
                        </div>
                    </Link>
                    <div className="flex-grow font-instrument text-ct-primary px-3 flex items-center whitespace-nowrap overflow-hidden min-w-0">
                        <span className="min-[500px]:hidden">CTS</span>
                        <span className="hidden min-[500px]:inline">Creative Tech Stack</span>
                    </div>

                    <ThemeToggle />
                </div>

                {/* Article Info Bar */}
                <div className="group flex flex-row flex-wrap gap-x-6 gap-y-0 justify-between text-3xl sm:text-3xl md:text-3xl border-b-2 border-ct-primary py-2 px-2 divide-ct-primary">
                    <h3 className="w-fit font-instrument text-ct-primary text-balance">
                        {data.title}
                    </h3>
                    <time className="font-instrument uppercase text-ct-primary whitespace-nowrap">
                        {formatDate(data.date)}
                    </time>
                </div>
            </header>
            <article className="w-full overflow-y-auto bg-ct-secondary">
                <div className="w-full h-screen  text-ct-primary">
                    <div className="prose prose-lg max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-[50vh]">
                        <MDXRemote
                            source={content}
                            components={mdxComponents}
                        />
                    </div>
                </div>
            </article>
        </div>
    );
}

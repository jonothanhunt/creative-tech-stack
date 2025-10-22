import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/mdx-components";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TfiArrowLeft } from "react-icons/tfi";

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
        <div className="h-screen max-h-screen grid grid-cols-1 grid-rows-[auto_1fr]">
            <header className="mix-blend-color-dodge">
                <Link
                    href="/"
                    className="group hover:bg-ct-primary flex flex-row gap-2 justify-between text-3xl sm:text-3xl md:text-3xl py-2 transition-[padding,background-color] duration-200 group-hover:duration-100  divide-ct-primary divide"
                >
                    <div className="w-fit font-instrument uppercase whitespace-nowrap transition-colors text-ct-primary/50 group-hover:text-ct-secondary">
                        <TfiArrowLeft className="inline-block -ml-1 -mt-[0.4rem] h-6" />
                        Back
                    </div>
                    <h1 className="font-instrument uppercase transition-colors text-ct-primary/50 group-hover:text-ct-secondary">
                        Creative Tech{" "}
                        <span className="hidden sm:inline">Newsletter</span>
                    </h1>
                </Link>
                <div className="group flex flex-col sm:flex-row sm:gap-6 justify-between text-3xl sm:text-3xl md:text-3xl border-t-2 py-2  border-y-ct-primary divide-ct-primary divide">
                    <h3 className="w-fit font-instrument uppercase  text-ct-primary ">
                        {data.title}
                    </h3>
                    <time className="font-instrument uppercase text-ct-primary/80 ">
                        {formatDate(data.date)}
                    </time>
                </div>
            </header>
            <article className="w-full overflow-y-auto bg-ct-primary">
                <div className="w-full h-screen  text-ct-secondary">
                    <div className="prose prose-lg max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/mdx-components";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TfiArrowLeft } from "react-icons/tfi";
import { ThemeToggle } from "@/components/ThemeToggle";
import Image from "next/image";
import StickyHeader from "@/components/StickyHeader";
import Footer from "@/components/Footer";
import { formatDate } from "@/lib/utils";

import { getContributors } from "@/lib/contributors";

export default async function BlogPost({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}) {
    const { slug } = await params;
    const contributors = await getContributors();
    const slugStr = slug.join("/");
    const filePath = path.join(process.cwd(), "posts", `${slugStr}.mdx`);

    if (!fs.existsSync(filePath)) {
        notFound();
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(fileContents);



    return (
        <div className="h-screen max-h-screen grid grid-cols-1 grid-rows-[auto_1fr] bg-ct-secondary">

            <header className="z-50 bg-ct-secondary border-b-2 border-ct-primary relative">
                <div className="flex flex-row justify-between text-3xl sm:text-3xl md:text-3xl h-12">
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
            </header>


            <div className="w-full overflow-y-auto bg-ct-secondary relative flex flex-col">

                {data.image && (
                    <div className="relative w-full h-[50vh] shrink-0 border-b-2 border-ct-primary bg-[#FFEDA3] overflow-hidden">
                        <Image
                            src={data.image}
                            alt={data.title}
                            fill
                            className="object-cover grayscale mix-blend-multiply"
                            priority
                        />
                        <div className="absolute inset-0 bg-[#100037] mix-blend-lighten pointer-events-none" />
                        <div
                            className="absolute inset-0 mix-blend-normal pointer-events-none"
                            style={{
                                backgroundImage:
                                    "radial-gradient(var(--color-ct-secondary) 0.5px, transparent 0.5px), radial-gradient(var(--color-ct-secondary) 0.5px, transparent 0.5px)",
                                backgroundSize: "4px 4px",
                                backgroundPosition: "0 0, 2px 2px",
                            }}
                        />
                    </div>
                )}


                <StickyHeader
                    title={data.title}
                    date={formatDate(data.date)}
                    author={data.author}
                />


                <article className="w-full">
                    <div className="prose prose-lg max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                        <MDXRemote
                            source={content}
                            components={mdxComponents}
                        />
                    </div>
                </article>
                <Footer contributors={contributors} />
            </div>
        </div>
    );
}

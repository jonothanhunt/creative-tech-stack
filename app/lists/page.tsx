"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Nav from "@/components/Nav";
import data from "@/app/data/data.json";

export default function ListsPage() {
    const searchParams = useSearchParams();
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory") || "Tools";

    const topOptions = data.map((cat) => cat.name);
    const subOptions = ["Tools", "Resources"];

    // Find selected category and subcategory data
    const selectedCategory = data.find((cat) => cat.name === category);
    const selectedSubcategory = selectedCategory?.subcategories.find(
        (sub) => sub.name === subcategory
    );
    const items = selectedSubcategory?.items || [];

    const stickyRef = useRef<HTMLDivElement>(null);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    return (
        <div>
            {/* Top level filter */}
            <div
                ref={stickyRef}
                className="sticky top-0"
                style={{
                    background:
                        "linear-gradient(40deg, rgba(131, 58, 180, 1) 0%, rgb(169, 20, 20) 50%, rgb(176, 117, 36) 100%)",
                    backgroundSize: "100% 100%",
                    backgroundAttachment: "fixed",
                }}
            >
                <div className="mix-blend-color-dodge">
                    <Nav />
                    <div className="flex flex-row flex-wrap justify-between text-4xl sm:text-4xl border-t-2 border-y-ct-primary divide-ct-primary divide">
                        {topOptions.map((option) => (
                            <Link
                                key={option}
                                href={`/lists?category=${encodeURIComponent(
                                    option
                                )}&subcategory=${subcategory}`}
                                className={`w-fit flex-grow h-full py-2 px-2 font-instrument uppercase transition-[color,background-color] flex items-center justify-center whitespace-nowrap ${
                                    category === option
                                        ? "text-ct-secondary bg-ct-primary"
                                        : "text-ct-primary"
                                } hover:text-ct-secondary hover:bg-ct-primary`}
                            >
                                {option}
                            </Link>
                        ))}
                    </div>
                    {/* Next level filter, shown when category is selected */}
                    {category && (
                        <div className="flex flex-row flex-wrap justify-between text-4xl sm:text-4xl border-y-2 border-y-ct-primary divide-ct-primary divide">
                            {subOptions.map((option) => (
                                <Link
                                    key={option}
                                    href={`/lists?category=${encodeURIComponent(
                                        category
                                    )}&subcategory=${encodeURIComponent(
                                        option
                                    )}`}
                                    className={`w-fit flex-grow h-full py-2 px-4 font-instrument uppercase transition-[color,background-color] flex items-center justify-center whitespace-nowrap ${
                                        subcategory === option
                                            ? "text-ct-secondary bg-ct-primary"
                                            : "text-ct-primary"
                                    } hover:text-ct-secondary hover:bg-ct-primary`}
                                >
                                    {option}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {/* Content */}
            <div className="">
                {category ? (
                    <div className="flex flex-wrap">
                        {items.map((item) => (
                            <div
                                key={item.name}
                                className="group w-full min-w-0 md:w-1/2 lg:w-1/3 border-r-2 border-b-2 border-ct-primary cursor-pointer flex flex-col"
                                onClick={() =>
                                    window.open(item.links[0].url, "_blank")
                                }
                            >
                                <div className="w-full aspect-[4/3] bg-gradient-to-br from-ct-primary to-ct-secondary"></div>
                                <div className="mix-blend-color-dodge flex flex-col flex-grow">
                                    <div className={`flex-1 ${hoveredItem !== item.name ? 'group-hover:bg-ct-primary' : ''} text-ct-primary ${hoveredItem !== item.name ? 'group-hover:text-ct-secondary' : ''} p-4 transition-[color,background-color]`}>
                                        <h3 className="text-2xl font-lastik font-[50] mb-2">
                                            {item.name}
                                        </h3>
                                        <p className=" mb-4">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap border-t-2 border-ct-primary">
                                        {item.links.map((link, index) => {
                                            if (index === 0) {
                                                return (
                                                    <span
                                                        key={index}
                                                        className={`flex-1 py-1 px-2 font-instrument uppercase text-ct-primary bg-transparent transition-[color,background-color] ${hoveredItem !== item.name ? 'group-hover:text-ct-secondary group-hover:bg-ct-primary' : ''} no-underline text-center whitespace-nowrap first:border-l-0 border-l-2 border-ct-primary`}
                                                    >
                                                        {link.title}
                                                    </span>
                                                );
                                            } else {
                                                return (
                                                    <a
                                                        key={index}
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                        onMouseEnter={() => setHoveredItem(item.name)}
                                                        onMouseLeave={() => setHoveredItem(null)}
                                                        className="flex-1 py-1 px-2 font-instrument uppercase text-ct-primary bg-transparent transition-[color,background-color] hover:text-ct-secondary hover:bg-ct-primary no-underline text-center whitespace-nowrap first:border-l-0 border-l-2 border-ct-primary"
                                                    >
                                                        {link.title}
                                                    </a>
                                                );
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 mt-8">
                        Select a category to view tools and resources.
                    </p>
                )}
            </div>
        </div>
    );
}

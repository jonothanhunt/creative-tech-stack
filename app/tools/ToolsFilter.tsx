"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Tool } from "@/lib/db";
import Image from "next/image";
import FilterMenu from "@/components/FilterMenu";
import Nav from "@/components/Nav";
import { TfiArrowUp, TfiArrowDown } from "react-icons/tfi";
import Footer from "@/components/Footer";

import { Contributor } from "@/lib/contributors";

interface ToolsFilterProps {
    tools: Tool[];
    categories: string[];
    types: string[];
    stacks: string[];
    contributors?: Contributor[];
}

export default function ToolsFilter({
    tools,
    categories,
    types,
    stacks,
    contributors = [],
}: ToolsFilterProps) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [filters] = useState<{
        categories: string[];
        types: string[];
        stacks: string[];
    }>({ categories, types, stacks });



    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(true);

    useEffect(() => {
        const cat = searchParams.get("category");
        const typ = searchParams.get("type");
        const stk = searchParams.get("stacks");
        setSelectedCategory(cat);
        setSelectedType(typ);
        setSelectedStacks(
            stk
                ? stk
                    .split(",")
                    .map((s: string) => s.trim())
                    .filter((s: string) => s)
                : []
        );
    }, [searchParams]);

    let filteredTools = tools;

    // Default to featured tools if no filters are selected
    if (!selectedCategory && !selectedType && selectedStacks.length === 0) {
        filteredTools = filteredTools.filter((tool) => tool.featured);
    }

    if (selectedCategory) {
        filteredTools = filteredTools.filter((tool) =>
            tool.categories.includes(selectedCategory)
        );
    }
    if (selectedType) {
        filteredTools = filteredTools.filter(
            (tool) => tool.type === selectedType
        );
    }
    if (selectedStacks.length > 0) {
        filteredTools = filteredTools.filter((tool) =>
            selectedStacks.some((s) => tool.stacks.includes(s))
        );
    }

    // Compute available stacks based on current category and type
    const availableStacks = Array.from(
        new Set(
            tools
                .filter((tool) => {
                    if (
                        selectedCategory &&
                        !tool.categories.includes(selectedCategory)
                    )
                        return false;
                    if (selectedType && tool.type !== selectedType)
                        return false;
                    return true;
                })
                .flatMap((tool) => tool.stacks)
        )
    ).sort();

    // Compute available types based on current category
    const availableTypes = Array.from(
        new Set(
            tools
                .filter((tool) =>
                    selectedCategory
                        ? tool.categories.includes(selectedCategory)
                        : true
                )
                .map((tool) => tool.type)
        )
    ).sort();

    const toggleStack = (stack: string) => {
        const newStacks = selectedStacks.includes(stack)
            ? selectedStacks.filter((s: string) => s !== stack)
            : [...selectedStacks, stack];
        setSelectedStacks(newStacks);
        const params = new URLSearchParams(searchParams.toString());
        if (newStacks.length > 0) {
            params.set("stacks", newStacks.join(","));
        } else {
            params.delete("stacks");
        }
        router.push(`/tools?${params.toString()}`);
    };

    const stickyRef = useRef<HTMLDivElement>(null);

    return (
        <div className="bg-ct-secondary min-h-screen">
            <div
                ref={stickyRef}
                className="sticky top-0 z-10 bg-ct-secondary"
            >
                <div>
                    <Nav />
                    {showFilters && (
                        <>
                            {filters.categories.length > 0 && (
                                <FilterMenu
                                    options={filters.categories}
                                    selectedValues={
                                        selectedCategory ? [selectedCategory] : []
                                    }
                                    onToggle={() => { }}
                                    baseUrl="/tools"
                                    paramName="category"
                                    isMultiSelect={false}
                                />
                            )}

                            {selectedCategory &&
                                availableTypes.length > 0 && (
                                    <FilterMenu
                                        options={availableTypes}
                                        selectedValues={
                                            selectedType ? [selectedType] : []
                                        }
                                        onToggle={() => { }}
                                        baseUrl={`/tools?category=${encodeURIComponent(
                                            selectedCategory
                                        )}`}
                                        paramName="type"
                                        isMultiSelect={false}
                                    />
                                )}

                            {selectedCategory &&
                                availableStacks.length > 0 && (
                                    <FilterMenu
                                        options={availableStacks}
                                        selectedValues={selectedStacks}
                                        onToggle={toggleStack}
                                        isMultiSelect={true}
                                    />
                                )}
                        </>
                    )}

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="w-full flex items-center justify-center gap-2 border-b-2 border-ct-primary text-ct-primary hover:bg-ct-primary hover:text-ct-secondary font-instrument uppercase py-2 cursor-pointer transition-colors text-xl"
                    >
                        {showFilters ? <TfiArrowUp /> : <TfiArrowDown />}
                        <span>{showFilters ? "HIDE FILTERS" : "SHOW FILTERS"}</span>
                    </button>
                </div>
            </div>

            <div className="overflow-hidden">
                {!tools.length ? null : (
                    <div className="flex flex-wrap -ml-[2px] -mt-[2px] w-[calc(100%+2px)]">
                        {filteredTools.map((tool) => (
                            <div
                                key={tool.name}
                                className="group w-full min-w-0 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 border-t-0 border-b-2 border-ct-primary cursor-pointer flex flex-col border-l-2 border-r-0 md:odd:border-r-2 md:even:border-l-0 lg:[&:nth-child(3n+1)]:border-l-2 lg:[&:nth-child(3n+1)]:border-r-2 lg:[&:nth-child(3n+2)]:border-l-0 lg:[&:nth-child(3n+2)]:border-r-2 lg:[&:nth-child(3n)]:border-l-0 lg:[&:nth-child(3n)]:border-r-0 xl:[&:nth-child(4n+1)]:border-l-2 xl:[&:nth-child(4n+1)]:border-r-2 xl:[&:nth-child(4n+2)]:border-l-0 xl:[&:nth-child(4n+2)]:border-r-2 xl:[&:nth-child(4n+3)]:border-l-0 xl:[&:nth-child(4n+3)]:border-r-2 xl:[&:nth-child(4n)]:border-l-0 xl:[&:nth-child(4n)]:border-r-0 2xl:[&:nth-child(5n+1)]:border-l-2 2xl:[&:nth-child(5n+1)]:border-r-2 2xl:[&:nth-child(5n+2)]:border-l-0 2xl:[&:nth-child(5n+2)]:border-r-2 2xl:[&:nth-child(5n+3)]:border-l-0 2xl:[&:nth-child(5n+3)]:border-r-2 2xl:[&:nth-child(5n+4)]:border-l-0 2xl:[&:nth-child(5n+4)]:border-r-2 2xl:[&:nth-child(5n)]:border-l-0 2xl:[&:nth-child(5n)]:border-r-0"
                                onClick={() =>
                                    window.open(tool.links[0].url, "_blank")
                                }
                            >
                                <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-[#FFB31B] via-[#FF32D9] to-[#2B0BFF]">
                                    {tool.image && (
                                        <Image
                                            src={tool.image}
                                            alt={tool.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    )}
                                </div>
                                <div className="mix-blend-normal flex flex-col flex-grow">
                                    <div
                                        className="flex-1 group-hover:bg-ct-primary group-has-[a:hover]:bg-transparent text-ct-primary group-hover:text-ct-secondary group-has-[a:hover]:text-ct-primary p-4 transition-[color,background-color]"
                                    >
                                        <h3 className="text-2xl font-lastik font-[50] mb-2 text-balance">
                                            {tool.name}
                                        </h3>
                                        <p className="">{tool.description}</p>
                                    </div>
                                    <div className="flex text-xl flex-wrap border-t-2 border-ct-primary">
                                        {tool.links.map((link, index) => {
                                            if (index === 0) {
                                                return (
                                                    <span
                                                        key={index}
                                                        className="flex-1 py-1 px-2 font-instrument text-ct-primary bg-transparent transition-[color,background-color] group-hover:text-ct-secondary group-hover:bg-ct-primary group-has-[a:hover]:text-ct-primary group-has-[a:hover]:bg-transparent no-underline text-center whitespace-nowrap first:border-l-0 border-l-2 border-ct-primary"
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
                                                        className="flex-1 py-1 px-2 font-instrument text-ct-primary bg-transparent transition-[color,background-color] hover:text-ct-secondary hover:bg-ct-primary no-underline text-center whitespace-nowrap first:border-l-0 border-l-2 border-ct-primary"
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
                )}
            </div>
            <Footer contributors={contributors} />
        </div>
    );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Tool } from "@/lib/db";
import Image from "next/image";
import FilterMenu from "@/components/FilterMenu";
import Nav from "@/components/Nav";
import { TfiArrowUp, TfiArrowDown } from "react-icons/tfi";
import { IoMdGitBranch } from "react-icons/io";
import { PiMedalThin } from "react-icons/pi";
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
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-[2px] bg-ct-primary border-b-2 border-ct-primary">
                        {(!selectedCategory && !selectedType && selectedStacks.length === 0) && (
                            <div className="group w-full h-full bg-ct-secondary flex flex-col">
                                <div className="flex flex-col h-auto min-[702px]:h-full bg-ct-secondary px-8 pt-8 pb-8 box-border items-center text-center min-[702px]:items-start min-[702px]:text-left">
                                    <h3 className="text-6xl font-lastik font-[50] mb-2 text-ct-primary leading-[1.1]">
                                        Showing featured
                                    </h3>
                                    <p className="text-xl font-instrument mb-0 min-[702px]:mb-8 text-ct-primary">
                                        Use filters above to find more tools
                                    </p>
                                    <div className="hidden min-[702px]:block mt-auto text-8xl text-ct-primary -ml-[1.3rem]">
                                        <PiMedalThin />
                                    </div>
                                </div>
                            </div>
                        )}
                        {filteredTools.map((tool) => (
                            <div
                                key={tool.name}
                                className="group w-full cursor-pointer flex flex-col bg-ct-secondary"
                                onClick={() =>
                                    window.open(tool.links[0].url, "_blank")
                                }
                            >
                                <div className="relative w-full h-72 bg-gradient-to-br from-[#FFB31B] via-[#FF32D9] to-[#2B0BFF]">
                                    {tool.image && (
                                        <Image
                                            src={tool.image}
                                            alt={tool.name}
                                            fill
                                            className="p-6"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            style={{ objectFit: 'contain' }}
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
                                        <p className="">
                                            {tool.description}
                                            {tool.isOpenSource && (
                                                <span className="inline-flex items-center gap-1 text-sm font-sans ml-2 translate-y-[2px] whitespace-nowrap">
                                                    <IoMdGitBranch />
                                                    <span>Open source</span>
                                                </span>
                                            )}
                                        </p>
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

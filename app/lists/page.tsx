"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ItemWithId } from "@/lib/db";
import FilterMenu from "@/components/FilterMenu";
import Nav from "@/components/Nav";

export default function ListsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [items, setItems] = useState<ItemWithId[]>([]);
    const [filters, setFilters] = useState<{
        categories: string[];
        types: string[];
        stacks: string[];
    }>({ categories: [], types: [], stacks: [] });
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedStacks, setSelectedStacks] = useState<string[]>([]);

    useEffect(() => {
        fetch("/api/items").then((res) => res.json()).then((itemsData: ItemWithId[]) => {
            setItems(itemsData);
            const categories = Array.from(new Set(itemsData.flatMap((item: ItemWithId) => item.categories))).sort();
            const types = Array.from(new Set(itemsData.map((item: ItemWithId) => item.type))).sort();
            const stacks = Array.from(new Set(itemsData.flatMap((item: ItemWithId) => item.stacks))).sort();
            setFilters({ categories, types, stacks });
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        const cat = searchParams.get("category");
        const typ = searchParams.get("type");
        const stk = searchParams.get("stacks");
        setSelectedCategory(cat);
        setSelectedType(typ);
        setSelectedStacks(stk ? stk.split(",").map((s: string) => s.trim()).filter((s: string) => s) : []);
    }, [searchParams]);

    let filteredItems = items;
    if (selectedCategory) {
        filteredItems = filteredItems.filter((item) => item.categories.includes(selectedCategory));
    }
    if (selectedType) {
        filteredItems = filteredItems.filter((item) => item.type === selectedType);
    }
    if (selectedStacks.length > 0) {
        filteredItems = filteredItems.filter((item) => selectedStacks.some((s) => item.stacks.includes(s)));
    }

    // Compute available stacks based on current category and type
    const availableStacks = Array.from(
        new Set(
            items
                .filter((item) => {
                    if (selectedCategory && !item.categories.includes(selectedCategory))
                        return false;
                    if (selectedType && item.type !== selectedType) return false;
                    return true;
                })
                .flatMap((item) => item.stacks)
        )
    ).sort();

    // Compute available types based on current category
    const availableTypes = Array.from(
        new Set(
            items
                .filter((item) => selectedCategory ? item.categories.includes(selectedCategory) : true)
                .map((item) => item.type)
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
        router.push(`/lists?${params.toString()}`);
    };

    const stickyRef = useRef<HTMLDivElement>(null);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    return (
        <div className="bg-black">
            {/* Top level filter */}
            <div
                ref={stickyRef}
                className="sticky top-0 z-10 bg-black/50 backdrop-blur-2xl backdrop-hue-rotate-180"
                // style={{
                //     background:
                //         "linear-gradient(40deg, rgba(131, 58, 180, 1) 0%, rgb(169, 20, 20) 50%, rgb(176, 117, 36) 100%)",
                //     backgroundSize: "100% 100%",
                //     backgroundAttachment: "fixed",
                // }}
            >
                <div className="">
                    <Nav />
                    {!loading && filters.categories.length > 0 && (
                        <FilterMenu
                            options={filters.categories}
                            selectedValues={selectedCategory ? [selectedCategory] : []}
                            onToggle={() => {}}
                            baseUrl="/lists"
                            paramName="category"
                            isMultiSelect={false}
                        />
                    )}
                    {/* Second level filter, shown when category is selected */}
                    {!loading && selectedCategory && availableTypes.length > 0 && (
                        <FilterMenu
                            options={availableTypes}
                            selectedValues={selectedType ? [selectedType] : []}
                            onToggle={() => {}}
                            baseUrl={`/lists?category=${encodeURIComponent(
                                selectedCategory
                            )}`}
                            paramName="type"
                            isMultiSelect={false}
                        />
                    )}
                    {/* Third level filter, shown when type is selected */}
                    {!loading && selectedCategory && availableStacks.length > 0 && (
                        <FilterMenu
                            options={availableStacks}
                            selectedValues={selectedStacks}
                            onToggle={toggleStack}
                            isMultiSelect={true}
                        />
                    )}
                </div>
            </div>
            {/* Content */}
            <div className="">
                {!items.length && loading ? (
                    <div className="p-4 text-ct-primary">Loading...</div>
                ) : (
                    <div className="flex flex-wrap">
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className="group w-full min-w-0 md:w-1/2 lg:w-1/3 border-r-2 border-b-2 border-ct-primary cursor-pointer flex flex-col"
                                onClick={() =>
                                    window.open(item.links[0].url, "_blank")
                                }
                            >
                                <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#FFB31B] via-[#FF32D9] to-[#2B0BFF]"></div>
                                <div className="mix-blend-normal flex flex-col flex-grow">
                                    <div
                                        className={`flex-1 ${
                                            hoveredItem !== item.name
                                                ? "group-hover:bg-ct-primary"
                                                : ""
                                        } text-ct-primary ${
                                            hoveredItem !== item.name
                                                ? "group-hover:text-ct-secondary"
                                                : ""
                                        } p-4 transition-[color,background-color]`}
                                    >
                                        <h3 className="text-2xl font-lastik font-[50] mb-2">
                                            {item.name}
                                        </h3>
                                        <p className="">{item.description}</p>
                                    </div>
                                    <div className="flex text-xl flex-wrap border-t-2 border-ct-primary">
                                        {item.links.map((link, index) => {
                                            if (index === 0) {
                                                return (
                                                    <span
                                                        key={index}
                                                        className={`flex-1 py-1 px-2 font-instrument text-ct-primary bg-transparent transition-[color,background-color] ${
                                                            hoveredItem !==
                                                            item.name
                                                                ? "group-hover:text-ct-secondary group-hover:bg-ct-primary"
                                                                : ""
                                                        } no-underline text-center whitespace-nowrap first:border-l-0 border-l-2 border-ct-primary`}
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
                                                        onMouseEnter={() =>
                                                            setHoveredItem(
                                                                item.name
                                                            )
                                                        }
                                                        onMouseLeave={() =>
                                                            setHoveredItem(null)
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
        </div>
    );
}

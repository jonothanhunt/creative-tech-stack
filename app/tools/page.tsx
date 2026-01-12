import { getAllTools, Tool } from "@/lib/db";
import ToolsFilter from "./ToolsFilter";

import { getContributors } from "@/lib/contributors";

export const dynamic = 'force-dynamic';

export default async function ToolsPage() {
    const toolsData = await getAllTools();
    const contributors = await getContributors();

    const categories = Array.from(
        new Set(
            toolsData.flatMap((tool: Tool) => tool.categories)
        )
    ).sort();

    const types = Array.from(
        new Set(toolsData.map((tool: Tool) => tool.type))
    ).sort();

    const stacks = Array.from(
        new Set(
            toolsData.flatMap((tool: Tool) => tool.stacks)
        )
    ).sort();

    return (
        <ToolsFilter
            tools={toolsData}
            categories={categories}
            types={types}
            stacks={stacks}
            contributors={contributors}
        />
    );
}

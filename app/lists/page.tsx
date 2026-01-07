import { getAllItems, ItemWithId } from "@/lib/db";
import ListsFilter from "./ListsFilter";

export const dynamic = 'force-dynamic';

export default async function ListsPage() {
    const itemsData = await getAllItems();

    const categories = Array.from(
        new Set(
            itemsData.flatMap((item: ItemWithId) => item.categories)
        )
    ).sort();

    const types = Array.from(
        new Set(itemsData.map((item: ItemWithId) => item.type))
    ).sort();

    const stacks = Array.from(
        new Set(
            itemsData.flatMap((item: ItemWithId) => item.stacks)
        )
    ).sort();

    return (
        <ListsFilter
            items={itemsData}
            categories={categories}
            types={types}
            stacks={stacks}
        />
    );
}

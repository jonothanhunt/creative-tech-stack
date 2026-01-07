import { useRouter } from "next/navigation";

interface FilterMenuProps {
    options: string[];
    selectedValues: string[];
    onToggle: (value: string) => void;
    baseUrl?: string;
    paramName?: string;
    isMultiSelect?: boolean;
    className?: string;
}

export default function FilterMenu({
    options,
    selectedValues,
    onToggle,
    baseUrl = "",
    paramName = "",
    isMultiSelect = false,
    className = "",
}: FilterMenuProps) {
    const router = useRouter();
    const baseClasses = "group w-fit flex-grow h-11 px-2 font-instrument uppercase transition-[color,background-color] flex items-center justify-center whitespace-nowrap min-w-[45%] md:min-w-[30%]";
    const buildHref = (option: string) => {
        // If a baseUrl is provided, append the param using ? or & depending on existing query
        const param = encodeURIComponent(option);
        const key = paramName || 'category';
        if (baseUrl) {
            const separator = baseUrl.includes('?') ? '&' : '?';
            return `${baseUrl}${separator}${key}=${param}`;
        }
        // fallback to /lists if no baseUrl provided
        return `/lists?${key}=${param}`;
    };

    const handleSingleSelect = (option: string) => {
        if (selectedValues.includes(option)) {
            router.push(baseUrl || "/lists");
        } else {
            const href = buildHref(option);
            router.push(href);
        }
    };

    return (
        <div className={`overflow-hidden border-b-2 border-ct-primary ${className}`}>
            <div className={`flex flex-row flex-wrap justify-center items-center text-3xl sm:text-3xl -ml-[2px] -mt-[2px] w-[calc(100%+2px)]`}>
                {options.map((option) => {
                    const isSelected = selectedValues.includes(option);

                    if (isMultiSelect) {
                        return (
                            <button
                                key={option}
                                onClick={() => onToggle(option)}
                                className={`${baseClasses} border-l-2 border-t-2 border-r-0 border-b-0 border-ct-primary ${isSelected
                                    ? "text-ct-secondary bg-ct-primary"
                                    : "text-ct-primary"
                                    } hover:text-ct-secondary hover:bg-ct-primary`}
                            >
                                {option}
                            </button>
                        );
                    } else {
                        const hasSelection = selectedValues.length > 0;
                        const isDimmed = hasSelection && !isSelected;
                        return (
                            <button
                                key={option}
                                onClick={() => handleSingleSelect(option)}
                                className={`${baseClasses} border-l-2 border-t-2 border-r-0 border-b-0 border-ct-primary ${isSelected
                                    ? "text-ct-secondary bg-ct-primary"
                                    : "text-ct-primary"
                                    } hover:text-ct-secondary hover:bg-ct-primary`}
                            >
                                <span className={isDimmed ? "opacity-60 group-hover:opacity-100 transition-opacity" : ""}>
                                    {option}
                                </span>
                            </button>
                        );
                    }
                })}
            </div>
        </div>
    );
}
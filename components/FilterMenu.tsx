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
    const baseClasses = "w-fit flex-grow h-11 px-2 font-instrument uppercase transition-[color,background-color] flex items-center justify-center whitespace-nowrap";
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
        const href = buildHref(option);
        router.push(href);
    };

    return (
        <div className={`flex flex-row flex-wrap justify-between items-center text-3xl sm:text-3xl border-b-2 border-ct-primary ${className}`}>
            {options.map((option) => {
                const isSelected = selectedValues.includes(option);

                if (isMultiSelect) {
                    return (
                        <button
                            key={option}
                            onClick={() => onToggle(option)}
                            className={`${baseClasses} ${
                                isSelected
                                    ? "text-ct-secondary bg-ct-primary"
                                    : "text-ct-primary"
                            } hover:text-ct-secondary hover:bg-ct-primary`}
                        >
                            {option}
                        </button>
                    );
                } else {
                    return (
                        <button
                            key={option}
                            onClick={() => handleSingleSelect(option)}
                            className={`${baseClasses} ${
                                isSelected
                                    ? "text-ct-secondary bg-ct-primary"
                                    : "text-ct-primary"
                            } hover:text-ct-secondary hover:bg-ct-primary`}
                        >
                            {option}
                        </button>
                    );
                }
            })}
        </div>
    );
}
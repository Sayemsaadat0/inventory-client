import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

interface Item {
    label: string;
    value: string;
}

interface SearchProps {
    data: Item[];
    placeholder?: string;
    title?: string;
    onSelect?: (item: Item) => void;
    direction?: 'top' | 'bottom';
    inputClassName?: string; 
    suggestionClassName?: string; 
    suggestionItemClassName?: string; 
}

const SearchSelectInput: React.FC<SearchProps> = ({
    data,
    placeholder = "Search ...",
    onSelect,
    title,
    direction = 'bottom',
    inputClassName, 
    suggestionClassName, 
    suggestionItemClassName, 
}) => {
    const [search, setSearch] = useState<string>("");
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setShowSuggestions(true);
        setHighlightedIndex(-1);
    };

    const onClickItem = (item: Item) => {
        setSearch(item.label);
        setShowSuggestions(false);
        if (onSelect) {
            onSelect(item);
        }
    };

    const filtered = search.length > 0
        ? data.filter((item) =>
            item.label.toLowerCase().includes(search.toLowerCase())
        )
        : data;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            setHighlightedIndex((prevIndex) =>
                prevIndex < filtered.length - 1 ? prevIndex + 1 : prevIndex
            );
        } else if (e.key === "ArrowUp") {
            setHighlightedIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : prevIndex
            );
        } else if (e.key === "Enter") {
            if (highlightedIndex >= 0 && highlightedIndex < filtered.length) {
                onClickItem(filtered[highlightedIndex]);
            }
        } else if (e.key === "Escape") {
            setShowSuggestions(false);
        }
    };

    const handleFocus = () => {
        setShowSuggestions(true);
        setHighlightedIndex(-1);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setShowSuggestions(false);
        }, 100);
    };

    useEffect(() => {
        setHighlightedIndex(-1);
    }, [showSuggestions]);

    return (
        <div>
            {title && <p className="py-1">{title}</p>}
            <div className="relative">
                <input
                    type="text"
                    value={search}
                    placeholder={placeholder}
                    onChange={onSearch}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={clsx(
                        "w-full px-2 py-1 bg-black+/20 border border-gray-700 focus:outline-none text-white",
                        inputClassName // Apply custom input class
                    )}
                />
                {showSuggestions && (
                    <ul
                        className={clsx(
                            "absolute z-50 w-full rounded-md max-h-60 overflow-auto bg-white text-black border border-gray-300 ",
                            suggestionClassName, // Apply custom suggestion class
                            {
                                "bottom-full mb-1": direction === "top",
                                "top-full mt-1 max-h-[calc(50vh)]": direction === "bottom",
                            }
                        )}
                    >
                        {filtered.length > 0 ? (
                            filtered.map((item, index) => (
                                <li
                                    key={item.value}
                                    onClick={() => onClickItem(item)}
                                    className={clsx(
                                        "p-2 cursor-pointer hover:bg-black/20 transition-all",
                                        suggestionItemClassName, 
                                        {
                                            "bg-white/20": highlightedIndex === index,
                                        }
                                    )}
                                >
                                    {item.label}
                                </li>
                            ))
                        ) : (
                            <li className="p-2">No data found</li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchSelectInput;

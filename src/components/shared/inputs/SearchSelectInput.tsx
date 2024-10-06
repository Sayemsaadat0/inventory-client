import React, { useState, useEffect } from 'react';

interface Item {
    label: string;
    value: string;
}

interface SearchProps {
    data: Item[];
    placeholder?: string;
    title?: string;
    onSelect?: (item: Item) => void;
    direction?: 'top' | 'bottom'; // Added direction prop
}

const SearchSelectInput: React.FC<SearchProps> = ({
    data,
    placeholder = "Search ...",
    onSelect,
    title,
    direction = 'bottom' // Default direction is bottom
}) => {
    const [search, setSearch] = useState<string>("");
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1); // Track highlighted index

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setShowSuggestions(true);
        setHighlightedIndex(-1); // Reset highlighted index on new search
    };

    const onClickItem = (item: Item) => {
        setSearch(item.label);
        setShowSuggestions(false);
        if (onSelect) {
            onSelect(item);
        }
    };

    // Filter based on search input
    const filtered = search.length > 0
        ? data.filter((item) =>
            item.label.toLowerCase().includes(search.toLowerCase())
        )
        : data; // Show all data when search is empty

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

    // Handle focus to show all suggestions
    const handleFocus = () => {
        setShowSuggestions(true);
        setHighlightedIndex(-1); // Reset highlighted index
    };

    // Optional: Hide suggestions when input loses focus
    const handleBlur = () => {
        setTimeout(() => {
            setShowSuggestions(false);
        }, 100); // Delay to allow click on suggestion
    };

    useEffect(() => {
        setHighlightedIndex(-1); // Reset highlighted index when suggestions are shown
    }, [showSuggestions]);

    return (
        <div >
            {
                title && <p className='py-2'>{title}</p>
            }
            <div className="relative">
                <input
                    type="text"
                    value={search}
                    placeholder={placeholder}
                    onChange={onSearch}
                    onKeyDown={handleKeyDown} 
                    onFocus={handleFocus}
                    onBlur={handleBlur} 
                    className="w-full px-1 py-0.5 bg-black/40 border focus:outline-none text-white"
                />
                {showSuggestions && (
                    <ul
                        className={`absolute z-10 w-full rounded-md max-h-60 overflow-auto bg-white text-black border border-gray-300 ${direction === 'top' ? 'bottom-full mb-1' : 'top-full mt-1 max-h-[calc(50vh)]'
                            }`}
                    >
                        {filtered.length > 0 ? (
                            filtered.map((item, index) => (
                                <li
                                    key={item.value}
                                    onClick={() => onClickItem(item)}
                                    className={`p-2 cursor-pointer hover:bg-black/20 transition-all ${highlightedIndex === index ? "bg-white/20" : ""
                                        }`}
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

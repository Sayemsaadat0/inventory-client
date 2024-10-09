import React, { createContext, useContext, useState, useEffect } from 'react';

interface BackgroundContextType1 {
    displayedBackground: string;
    setDisplayedBackground: (image: string) => void;
}

const BackgroundContext1 = createContext<BackgroundContextType1 | undefined>(undefined);

export const BackgroundProvider1: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [displayedBackground, setDisplayedBackground] = useState<string>("");

    // Get the saved background image from local storage
    useEffect(() => {
        const savedImage = localStorage.getItem("selectedImage");
        if (savedImage) {
            setDisplayedBackground(savedImage);
        }
    }, []);

    return (
        <BackgroundContext1.Provider value={{ displayedBackground, setDisplayedBackground }}>
            {children}
        </BackgroundContext1.Provider>
    );
};

export const useBackground1 = () => {
    const context = useContext(BackgroundContext1);
    if (!context) {
        throw new Error("useBackground must be used within a BackgroundProvider");
    }
    return context;
};

import React, { createContext, useContext, useState, ReactNode } from "react";

import bg1 from "../../assets/backgrounds/background.png";
import bg2 from "../../assets/backgrounds/background2.png";
import bg3 from "../../assets/backgrounds/background3.png";
import bg4 from "../../assets/backgrounds/background4.png";
import bg5 from "../../assets/backgrounds/background5.png";
import bg6 from "../../assets/backgrounds/background6.png";
import bg7 from "../../assets/backgrounds/background7.png";
import bg8 from "../../assets/backgrounds/background8.png";
import bg9 from "../../assets/backgrounds/background9.png";
import bg10 from "../../assets/backgrounds/background10.png";
import bg11 from "../../assets/backgrounds/background11.png";
import bg12 from "../../assets/backgrounds/background12.png";
import bg13 from "../../assets/backgrounds/background13.png";
import bg14 from "../../assets/backgrounds/background14.png";
import bg15 from "../../assets/backgrounds/background15.png";
import bg16 from "../../assets/backgrounds/background16.png";
import bg17 from "../../assets/backgrounds/background17.png";
import bg18 from "../../assets/backgrounds/background18.png";
import bg19 from "../../assets/backgrounds/background19.png";
import bg20 from "../../assets/backgrounds/background20.png";
import bg21 from "../../assets/backgrounds/background21.png";
import bg22 from "../../assets/backgrounds/background22.png";
import bg23 from "../../assets/backgrounds/background23.png";
import bg24 from "../../assets/backgrounds/background24.png";
import bg25 from "../../assets/backgrounds/background25.png";
import bg26 from "../../assets/backgrounds/background26.png";
import bg27 from "../../assets/backgrounds/background27.png";
import bg28 from "../../assets/backgrounds/background28.png";
import bg29 from "../../assets/backgrounds/background29.png";
import bg30 from "../../assets/backgrounds/background30.png";
import bg31 from "../../assets/backgrounds/background31.png";

const backgrounds: string[] = [
  bg1,
  bg2,
  bg3,
  bg4,
  bg5,
  bg6,
  bg7,
  bg8,
  bg9,
  bg10,
  bg11,
  bg12,
  bg13,
  bg14,
  bg15,
  bg16,
  bg17,
  bg18,
  bg19,
  bg20,
  bg21,
  bg22,
  bg23,
  bg24,
  bg25,
  bg26,
  bg27,
  bg28,
  bg29,
  bg30,
  bg31,
];

// Define types for the context
interface BackgroundContextType {
  displayedBackground: string;
  backgrounds: string[];
  selectBackground: (background: string | null) => void;
}

// Create the context with default values
const BackgroundContext = createContext<BackgroundContextType | undefined>(
  undefined
);

// Custom hook to use the BackgroundContext
export const useBackground = (): BackgroundContextType => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error("useBackground must be used within a BackgroundProvider");
  }
  return context;
};

// Context provider component
export const BackgroundProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedBackground, setSelectedBackground] = useState<string | null>(
    null
  );

  const getDailyBackground = (): string => {
    const totalBackgrounds = backgrounds.length;
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const dayOfYear = Math.floor(
      (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    const backgroundIndex = dayOfYear % totalBackgrounds;
    return backgrounds[backgroundIndex];
  };

  // Determine the current background based on user selection or daily random logic
  const displayedBackground = selectedBackground || getDailyBackground();

  return (
    <BackgroundContext.Provider
      value={{
        displayedBackground,
        backgrounds,
        selectBackground: setSelectedBackground,
      }}
    >
      {children}
    </BackgroundContext.Provider>
  );
};

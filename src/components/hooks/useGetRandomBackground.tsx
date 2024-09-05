// Import all 31 background images
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

// Store all backgrounds in an array
const backgrounds: string[] = [
  //   bg1,
  //   bg2,
  //   bg3,
  //   bg4,
  //   bg5,
  //   bg6,
  //   bg7,
  //   bg8,
  //   bg9,
  //   bg10,
  //   bg11,
  //   bg12,
  //   bg13,
  //   bg14,
  //   bg15,
  //   bg16,
  //   bg17,
  //   bg18,
  //   bg19,
  //   bg20,
  //   bg21,
  //   bg22,
  //   bg23,
  //   bg24,
  //   bg25,
  //   bg26,
  //   bg27,
  //   bg28,
  bg29,
  //   bg30,
  //   bg31,
];

// Hook to get a daily random background
const useGetDailyRandomBackground = (): string => {
  const totalBackgrounds = backgrounds.length; // Should be 31 in this case

  // Get the current day of the year (0 to 365)
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0); // Start of the year
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24; // Milliseconds in a day
  const dayOfYear = Math.floor(diff / oneDay);

  // Determine the index of the background for today using modulo
  const backgroundIndex = dayOfYear % totalBackgrounds;

  // Return the selected background
  return backgrounds[backgroundIndex];
};

export default useGetDailyRandomBackground;

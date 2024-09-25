// Import all 31 background images

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
  // bg27,
  //   bg28,
  // bg29,
  // bg30,
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

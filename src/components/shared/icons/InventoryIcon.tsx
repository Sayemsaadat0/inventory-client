interface InventoryIconProps {
  width?: string;
  height?: string;
  className?: string;
}

const InventoryIcon: React.FC<InventoryIconProps> = ({
  width,
  height,
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 842 697"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M744.166 168.778V585.733C744.166 633.539 705.705 672 657.899 672H183.433C135.627 672 97.166 633.539 97.166 585.733V168.778"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path
        d="M744.166 168.778V585.733C744.166 633.539 705.705 672 657.899 672H183.433C135.627 672 97.166 633.539 97.166 585.733V168.778"
        stroke="currentColor"
        strokeWidth="50"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M758.546 25H82.7904C67.5375 25 52.9093 31.0592 42.1239 41.8446C31.3385 52.63 25.2793 67.2582 25.2793 82.5111V111.267C25.2793 118.819 26.7669 126.298 29.6571 133.275C32.5473 140.253 36.7835 146.593 42.1239 151.933C52.9093 162.719 67.5375 168.778 82.7904 168.778H758.546C773.799 168.778 788.427 162.719 799.212 151.933C809.998 141.148 816.057 126.52 816.057 111.267V82.5111C816.057 74.9586 814.57 67.4801 811.679 60.5026C808.789 53.525 804.553 47.185 799.212 41.8446C793.872 36.5042 787.532 32.268 780.554 29.3778C773.577 26.4876 766.098 25 758.546 25Z"
        fill="white"
        stroke="currentColor"
        strokeWidth="50"
        strokeMiterlimit="10"
      />
      <path
        d="M276.891 312.555H564.446"
        stroke="currentColor"
        strokeWidth="50"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
};

InventoryIcon.defaultProps = {
  width: "20",
  height: "20",
};

export default InventoryIcon;

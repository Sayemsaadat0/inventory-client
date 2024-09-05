interface ReportsIconProps {
  width: string;
  height: string;
  className: string;
}

const ReportsIcon: React.FC<ReportsIconProps> = ({
  width,
  height,
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 670 717"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M143.164 615C173.07 585.667 218.659 588 244.917 620L281.753 665C311.294 700.667 359.071 700.667 388.612 665L425.447 620C451.706 588 497.294 585.667 527.2 615C592.118 678.333 645 657.333 645 568.667V193C645 58.6667 610.718 25 472.859 25H197.141C59.2823 25 25 58.6667 25 193V568.333C25.3647 657.333 78.6113 678 143.164 615Z"
        stroke="currentColor"
        strokeWidth="50"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M235.134 291.667H435.722"
        stroke="currentColor"
        strokeWidth="50"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

ReportsIcon.defaultProps = {
  width: "20",
  height: "20",
};

export default ReportsIcon;

interface DashboardIconProps {
  width: string;
  height: string;
  className: string;
}

const DashboardIcon: React.FC<DashboardIconProps> = ({
  width,
  height,
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 717 717"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25 365.13C25 288.85 25 250.709 42.3067 219.091C59.6133 187.474 91.2317 167.85 154.468 128.604L221.134 87.229C287.98 45.743 321.403 25 358.333 25C395.263 25 428.687 45.743 495.533 87.229L562.2 128.604C625.437 167.85 657.053 187.474 674.36 219.091C691.667 250.709 691.667 288.85 691.667 365.13V415.833C691.667 545.86 691.667 610.877 652.613 651.27C613.563 691.667 550.707 691.667 425 691.667H291.667C165.959 691.667 103.105 691.667 64.0523 651.27C25 610.877 25 545.86 25 415.833V365.13Z"
        stroke="currentColor"
        strokeWidth="50"
      />
      <path
        d="M458.333 558.333H258.333"
        stroke="currentColor"
        strokeWidth="50"
        strokeLinecap="round"
      />
    </svg>
  );
};

DashboardIcon.defaultProps = {
  width: "19",
  height: "19",
};

export default DashboardIcon;

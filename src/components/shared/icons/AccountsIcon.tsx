interface AccountsIconProps {
  width: string;
  height: string;
  className: string;
}

const AccountsIcon: React.FC<AccountsIconProps> = ({
  width,
  height,
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 717 755"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25 448C25 315.065 25 248.596 64.0523 207.298C103.105 166 165.959 166 291.667 166H425C550.707 166 613.563 166 652.613 207.298C691.667 248.596 691.667 315.065 691.667 448C691.667 580.935 691.667 647.406 652.613 688.701C613.563 730 550.707 730 425 730H291.667C165.959 730 103.105 730 64.0523 688.701C25 647.406 25 580.935 25 448Z"
        stroke="currentColor"
        strokeWidth="50"
      />
      <path
        d="M491.667 166C491.667 99.5319 491.667 66.2978 472.14 45.6491C452.613 25 421.187 25 358.333 25C295.48 25 264.052 25 244.526 45.6491C225 66.2978 225 99.5319 225 166"
        stroke="currentColor"
        strokeWidth="50"
      />
      <path
        d="M358.334 565.499C395.154 565.499 425 539.195 425 506.751C425 474.304 395.154 448 358.334 448C321.514 448 291.667 421.696 291.667 389.249C291.667 356.805 321.514 330.501 358.334 330.501M358.334 565.499C321.514 565.499 291.667 539.195 291.667 506.751M358.334 565.499V589M358.334 330.501V307M358.334 330.501C395.154 330.501 425 356.805 425 389.249"
        stroke="currentColor"
        strokeWidth="50"
        strokeLinecap="round"
      />
    </svg>
  );
};

AccountsIcon.defaultProps = {
  width: "20",
  height: "20",
};

export default AccountsIcon;

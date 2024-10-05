import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils";
import { IconType } from "../shared/icons/icons";


const buttonVariants = cva(
  "leading-none text-white transition-all disabled:bg-slate-300  disabled:text-slate-600",
  {
    variants: {
      variant: {
        roundedBtn:
          'rounded-[200px] text-xs px-[18px]  py-[12px] md:text-[15px] bg-black/40 md:px-6 md:py-2.5 xl:px-8 xl:py-3 xl:text-[16px]',
        roundedOutlinedBtn:
          'rounded-[200px] text-xs text-black px-[18px] py-[12px] md:text-[15px] border border-green-500 md:px-6 md:py-2.5 xl:px-8 xl:py-3 xl:text-[16px] ',
        regulerBtn:
          'rounded-[1px] text-xs px-[18px]  py-[12px] md:text-[15px] bg-black/40 md:px-6 md:py-2.5 xl:px-8 xl:py-3 xl:text-[16px]',
        regulerOutlineBtn:
          ' bg-black/50  text-xs hover:bg-white/20 transition-all border border-white px-[18px] py-[12px] font-semibold ',
        iconBtn: 'text-14-regular  p-2 bg-green-500 ',
        profileCardbtn:
          'rounded-[200px] text-xs px-4 py-1.5 bg-green-200',
        smallBtn:
          'rounded-[200px] text-xs px-4 py-1 bg-green-200 ',
      },
    },
    defaultVariants: {
      variant: "regulerOutlineBtn",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  label?: string;
  icon?: IconType;
  reverse?: boolean;
}


const Button: React.FC<ButtonProps> = ({
  variant,
  className,
  label,
  icon,
  reverse,
  ...props
}: ButtonProps) => {
  return (
    <button className={`${cn(buttonVariants({ variant, className }))} `} {...props}>
      <div
        className={
          icon &&
          `flex justify-center items-center gap-2  ${reverse ? 'flex-row-reverse justify-center items-center gap-2' : 'flex-row'}`
        }
      >
        <span>{icon && <>{icon}</>}</span>
        <span className="min-w-fit">{label}</span>
      </div>
    </button>
  );
};

export default Button;

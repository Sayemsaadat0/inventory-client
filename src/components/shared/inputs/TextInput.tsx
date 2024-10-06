
import { cva } from "class-variance-authority";
import React, { useEffect } from "react";
import { cn } from "../../../lib/utils";

const inputVariants = cva(
    "border-2 outline-none bg-inherit py-1  px-4   peer  disabled:bg-gray-100"
);

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    label?: string;
    error?: any;
    id: string;
}

const TextInput: React.FC<InputProps> = ({
    label,
    className,
    id,
    error,
    placeholder,
    ...props
}: InputProps) => {

    useEffect(() => {
        const handleWheel = (e: any) => {
            if (e.target.type === "number") {
                e.preventDefault();
            }
        };
        document.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            document.removeEventListener("wheel", handleWheel);
        };
    }, []);
    return (
        <div>
            <div className="relative rounded-[10px] w-full space-y-2  ">
                {
                    label &&
                    <label className="px-2" htmlFor={id}>{label}</label>
                }
                <input
                    autoComplete="off"
                    type="text"
                    id={id}
                    className={`w-full   ${error && "border-[#D31D1D] "} ${cn(
                        inputVariants({ className })
                    )}`}
                    {...props}
                    placeholder={placeholder ? placeholder : ""}
                />
                {error && <p className="text-red-500 ">{error}</p>}
            </div>
        </div>
    );
};

export default TextInput;

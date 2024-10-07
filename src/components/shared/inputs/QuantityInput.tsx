import React, { useState } from "react";
import clsx from "clsx";

interface QuantityInputProps {
    value?: number;
    min?: number;
    max?: number;
    onChange: (value: number) => void;
    className?: string;
    buttonClassName?: string;
    inputClassName?: string;
}

const QuantityInput: React.FC<QuantityInputProps> = ({
    value = 0,
    min = 0,
    max = Infinity,
    onChange,
    className,
    buttonClassName,
    inputClassName,
}) => {
    const [quantity, setQuantity] = useState<number>(value);

    const handleIncrease = () => {
        if (quantity < max) {
            const newQuantity = quantity + 1;
            setQuantity(newQuantity);
            onChange(newQuantity);
        }
    };

    const handleDecrease = () => {
        if (quantity > min) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onChange(newQuantity);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Math.max(min, Math.min(max, Number(e.target.value)));
        setQuantity(newQuantity);
        onChange(newQuantity);
    };

    return (
        <div className={clsx("flex items-center", className)}>
            <button
                className={clsx("px-2 py-1", buttonClassName)}
                onClick={handleDecrease}
                disabled={quantity <= min}
            >
                -
            </button>
            <input
                type="number"
                className={clsx(
                    "text-center mx-2 border rounded",
                    inputClassName
                )}
                value={quantity}
                onChange={handleInputChange}
                min={min}
                max={max}
            />
            <button
                className={clsx("px-2 py-1", buttonClassName)}
                onClick={handleIncrease}
                disabled={quantity >= max}
            >
                +
            </button>
        </div>
    );
};

export default QuantityInput;

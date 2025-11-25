"use client";

import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

interface QuantitySelectorProps {
  min?: number;
  max?: number;
  initialValue?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function QuantitySelector({
  min = 1,
  max = 99,
  initialValue = 1,
  onChange,
  disabled = false,
  size = "md",
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialValue);

  const handleIncrement = () => {
    if (quantity < max) {
      const newValue = quantity + 1;
      setQuantity(newValue);
      onChange?.(newValue);
    }
  };

  const handleDecrement = () => {
    if (quantity > min) {
      const newValue = quantity - 1;
      setQuantity(newValue);
      onChange?.(newValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= min && value <= max) {
      setQuantity(value);
      onChange?.(value);
    } else if (e.target.value === "") {
      setQuantity(min);
    }
  };

  const sizeClasses = {
    sm: {
      button: "w-7 h-7",
      input: "w-10 h-7 text-sm",
      icon: "w-3 h-3",
    },
    md: {
      button: "w-10 h-10",
      input: "w-16 h-10 text-base",
      icon: "w-4 h-4",
    },
    lg: {
      button: "w-12 h-12",
      input: "w-20 h-12 text-lg",
      icon: "w-5 h-5",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || quantity <= min}
        className={`${currentSize.button} flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300`}
        aria-label="Decrease quantity"
      >
        <FiMinus className={currentSize.icon} />
      </button>

      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        disabled={disabled}
        min={min}
        max={max}
        className={`${currentSize.input} text-center font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed`}
        aria-label="Quantity"
      />

      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || quantity >= max}
        className={`${currentSize.button} flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300`}
        aria-label="Increase quantity"
      >
        <FiPlus className={currentSize.icon} />
      </button>
    </div>
  );
}
import React, { FC, ChangeEvent } from "react";

interface QuantityControlProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export const QuantityControl: FC<QuantityControlProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  onChange,
  onBlur,
}) => (
  <div className="flex items-center border border-gray-300 rounded">
    <button
      type="button"
      onClick={onDecrement}
      disabled={quantity <= 1}
      className="px-3 py-1 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      –
    </button>
    <input
      type="number"
      min="1"
      value={quantity}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      onBlur={onBlur}
      className="w-16 text-center border-l border-r border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
    />
    <button
      type="button"
      onClick={onIncrement}
      className="px-3 py-1 text-gray-700 hover:bg-gray-100 transition-colors"
    >
      +
    </button>
  </div>
);

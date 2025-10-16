import { useState } from "react";
import { BsPlus, BsDash } from "react-icons/bs";

export default function QuantityInput({ value = 1, onChange }) {
  const [quantity, setQuantity] = useState(value);

  const handleChange = (newValue) => {
    const parsed = Math.max(1, parseInt(newValue) || 1);
    setQuantity(parsed);
    if (onChange) onChange(parsed);
  };

  return (
    <div className="flex items-center overflow-hidden w-20 border-b-1 border-b-stone-200 hover:border-b-black">
      <button
        className="flex-1 text-xl"
        onClick={() => handleChange(quantity - 1)}
      >
        <BsDash />
      </button>

      <input
      type="number"
      min="0"
      value={quantity}
      onChange={(e) => handleChange(e.target.value)}
      className="w-10 text-center outline-none
                [&::-webkit-outer-spin-button]:appearance-none
                [&::-webkit-inner-spin-button]:appearance-none
                [-moz-appearance:textfield]"
/>

      <button
        className="flex-1 text-xl"
        onClick={() => handleChange(quantity + 1)}
      >
        <BsPlus />
      </button>
    </div>
  );
}

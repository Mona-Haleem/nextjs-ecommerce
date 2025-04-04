import React from "react";

interface FloatingLabelInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="peer w-full px-4 py-3 pt-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      <label
        htmlFor={name}
        className="absolute left-4 top-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500">
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;

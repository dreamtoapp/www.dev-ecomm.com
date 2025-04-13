import React from "react";

interface InputFieldProps {
  name: string;
  label: string;
  type?: string; // Add an optional 'type' prop
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string; // Optional error message
}

export default function InputField({
  name,
  label,
  type = "text", // Default to "text" if no type is provided
  placeholder,
  value,
  onChange,
  error,
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium ">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type} // Use the 'type' prop here
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`mt-1 block w-full px-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

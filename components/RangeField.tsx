import React from 'react';

interface RangeFieldProps {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
}

const RangeField: React.FC<RangeFieldProps> = ({ label, name, value, onChange, min, max }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={name} className="block text-sm font-medium text-gray-600 dark:text-gray-400">
          {label}
        </label>
        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-semibold rounded-md">
          {value}
        </span>
      </div>
      <input
        type="range"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
    </div>
  );
};

export default RangeField;
import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, value, onChange, placeholder }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
      />
    </div>
  );
};

export default FormField;
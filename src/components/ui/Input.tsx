import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const inputClasses = `
    w-full px-3 py-2 border border-gray-300 rounded-lg
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
    dark:bg-gray-700 dark:border-gray-600 dark:text-white
    dark:focus:ring-blue-400 dark:focus:border-blue-400
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-colors duration-200
    ${Icon && iconPosition === 'left' ? 'pl-10' : ''}
    ${Icon && iconPosition === 'right' ? 'pr-10' : ''}
    ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          className={inputClasses}
          {...props}
        />
        {Icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};
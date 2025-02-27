// src/components/Input.tsx
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1 text-[var(--color-secondary)]">
        {label}
      </label>
      <input
        className={`w-full p-2 border border-[var(--color-secondary)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-tertiary)] ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs mt-1 text-[var(--color-accent)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;

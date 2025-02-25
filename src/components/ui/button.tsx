// File: src/components/ui/button.tsx
import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

// A simple, styled button component using Tailwind CSS classes
export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      className={`px-4 py-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

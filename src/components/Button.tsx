// src/components/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600 transition ease-in-out duration-150 ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;

// components/Button.tsx
import React from "react";

export type ButtonVariant = "primary" | "secondary" | "tertiary";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  children,
  ...props
}) => {
  const baseClasses =
    "px-6 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2";
  let variantClasses = "";

  switch (variant) {
    case "primary":
      variantClasses =
        "bg-[var(--color-tertiary)] text-white hover:bg-[var(--color-tertiary-80)] active:bg-[var(--color-tertiary-70)]";
      break;
    case "secondary":
      variantClasses =
        "bg-[var(--color-primary)] text-[var(--color-secondary)] border border-[var(--color-secondary)] hover:bg-[var(--color-primary-90)] active:bg-[var(--color-primary-80)]";
      break;
    case "tertiary":
      variantClasses =
        "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-80)] active:bg-[var(--color-accent-70)]";
      break;
    default:
      variantClasses = "";
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

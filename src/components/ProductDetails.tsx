import React, { FC, ReactNode } from "react";

interface ProductDetailsProps {
  name: string;
  description: string;
  error?: string;
  children: ReactNode;
}

export const ProductDetails: FC<ProductDetailsProps> = ({
  name,
  description,
  error,
  children,
}) => (
  <div className="p-8">
    <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
      {name}
    </div>
    <p className="mt-2 text-gray-600">{description}</p>
    {children}
    {error && (
      <p className="mt-2 text-red-500 text-sm" role="alert">
        {error}
      </p>
    )}
  </div>
);

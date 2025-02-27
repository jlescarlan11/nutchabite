// src/components/ProductSelection.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
}

interface ProductSelectionProps {
  orderData: any;
  updateOrderData: (data: any) => void;
  nextStep: () => void;
}

const ProductSelection: React.FC<ProductSelectionProps> = ({
  orderData,
  updateOrderData,
  nextStep,
}) => {
  // Sample product data
  const products: Product[] = [
    {
      id: 1,
      name: "Nutcha Bite Classic",
      image: "/assets/product1.jpg",
      description: "A timeless fusion of matcha and traditional bandi.",
    },
    {
      id: 2,
      name: "Nutcha Bite Deluxe",
      image: "/assets/product2.jpg",
      description: "Elevated flavor with premium ingredients.",
    },
  ];

  // Local state for selected product and configuration options.
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    orderData.product || null
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [size, setSize] = useState<string>("Medium");

  // Handle product selection.
  const handleSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  // Increase or decrease quantity ensuring it doesn't fall below 1.
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Handle proceeding to the next step.
  const handleNext = () => {
    if (selectedProduct) {
      updateOrderData({ product: selectedProduct, quantity, size });
      nextStep();
    }
  };

  return (
    <section aria-labelledby="product-selection">
      <h2 id="product-selection" className="text-2xl font-semibold mb-4">
        Select Your Nutcha Bite
      </h2>
      <div className="flex space-x-4 overflow-x-auto">
        {products.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.05 }}
            whileFocus={{ scale: 1.05 }}
            className={`min-w-[240px] bg-white rounded shadow-md p-4 cursor-pointer focus:outline-none ${
              selectedProduct?.id === product.id ? "ring-4 ring-green-500" : ""
            }`}
            onClick={() => handleSelect(product)}
            tabIndex={0}
            role="button"
            aria-pressed={selectedProduct?.id === product.id}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-medium">{product.name}</h3>
            <p className="text-sm text-gray-700">{product.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Show additional configuration options if a product is selected */}
      {selectedProduct && (
        <div className="mt-6 space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="quantity"
            >
              Quantity
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={decrementQuantity}
                className="px-3 py-1 bg-gray-300 rounded-l focus:outline-none"
                aria-label="Decrease quantity"
              >
                –
              </button>
              <input
                id="quantity"
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 text-center border-t border-b border-gray-300 focus:outline-none"
                aria-live="polite"
              />
              <button
                type="button"
                onClick={incrementQuantity}
                className="px-3 py-1 bg-gray-300 rounded-r focus:outline-none"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="size">
              Size
            </label>
            <select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleNext}
          className={`px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
            !selectedProduct ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!selectedProduct}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ProductSelection;

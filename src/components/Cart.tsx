// src/components/NutchaBitesCart.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { saveOrder } from "../services/idbService"; // Uncomment when ready for IndexedDB integration

// Define your product interface
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Sample products (replace image paths with real images)
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Nutcha Bite",
    price: 5.0,
    image: "/images/nutcha-bite-1.jpg",
    quantity: 1,
  },
  {
    id: 2,
    name: "Nutcha Bite Deluxe",
    price: 7.5,
    image: "/images/nutcha-bite-2.jpg",
    quantity: 1,
  },
];

const NutchaBitesCart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // On mount, load saved cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("nutchaCart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("nutchaCart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart with a fly-in effect
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product }];
    });
  };

  // Remove product from cart with an exit animation
  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // Adjust product quantity
  const updateQuantity = (productId: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      })
    );
  };

  // Checkout handler simulates saving the order (to IndexedDB/localStorage) and shows a celebratory animation
  const checkout = async () => {
    // Here you could add code to save to IndexedDB:
    // await saveOrder({ cart, date: new Date() });
    setOrderConfirmed(true);
    setTimeout(() => setOrderConfirmed(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-lg rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Nutcha Bites Order Form
        </h2>

        {/* Product Selection Area */}
        <div className="mb-4 space-y-4">
          {sampleProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-2 bg-white/50 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-full"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0px 0px 8px rgb(34, 197, 94)",
                  }}
                />
                <div>
                  <p className="font-semibold text-gray-700">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors duration-200"
              >
                Add
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white/40 rounded-lg p-4 mb-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Order Summary
          </h3>
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="flex items-center justify-between mb-3"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-700">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="bg-gray-200 rounded-full px-2 py-1 hover:bg-gray-300 transition"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="bg-gray-200 rounded-full px-2 py-1 hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Checkout Button */}
        <div className="text-center">
          <button
            onClick={checkout}
            className="relative inline-block px-6 py-3 font-semibold text-white rounded-full bg-gradient-to-r from-green-400 to-blue-500 overflow-hidden transition transform hover:scale-105 focus:outline-none"
          >
            Checkout
            {/* Optional ripple/micro-interaction effect */}
            <span className="absolute inset-0 bg-white opacity-0 rounded-full transition duration-300 group-hover:opacity-10"></span>
          </button>
        </div>
      </div>

      {/* Order confirmation overlay */}
      {orderConfirmed && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-4xl font-bold text-green-700">
            🎉 Order Confirmed! 🎉
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default NutchaBitesCart;

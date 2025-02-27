// src/components/OrderConfirmation.tsx
import React, { useEffect, useState } from "react";
import { saveOrderToLocalDB } from "../components/utils/localDB";
import { motion } from "framer-motion";

interface OrderConfirmationProps {
  orderData: any;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderData }) => {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Save the order to IndexedDB on mount.
  useEffect(() => {
    const saveOrder = async () => {
      try {
        const id = await saveOrderToLocalDB(orderData);
        setOrderId(id);
      } catch (err) {
        setError("Failed to save order. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    saveOrder();
  }, [orderData]);

  return (
    <section aria-labelledby="order-confirmation" className="text-center p-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {loading ? (
          <p className="text-lg">Saving your order...</p>
        ) : error ? (
          <p className="text-lg text-red-600" role="alert">
            {error}
          </p>
        ) : (
          <>
            <h2
              id="order-confirmation"
              className="text-3xl font-bold text-green-600"
            >
              Thank You for Your Order!
            </h2>
            <p className="mt-4">
              Your order has been received and will be processed shortly. A
              confirmation email has been sent.
            </p>
            <div className="mt-6">
              <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition mr-4">
                Print Receipt
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
                Email Order Details
              </button>
            </div>
            <p className="mt-4 text-gray-500">Order ID: {orderId || "N/A"}</p>
            <p className="text-gray-500">Date: {new Date().toLocaleString()}</p>
          </>
        )}
      </motion.div>
    </section>
  );
};

export default OrderConfirmation;

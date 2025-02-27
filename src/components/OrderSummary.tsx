// src/components/OrderSummary.tsx
import React from "react";
import { motion } from "framer-motion";

interface OrderSummaryProps {
  orderData: any;
  nextStep: () => void;
  prevStep: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  orderData,
  nextStep,
  prevStep,
}) => {
  return (
    <section aria-labelledby="order-summary">
      <h2 id="order-summary" className="text-2xl font-semibold mb-4">
        Review Your Order
      </h2>
      <div className="bg-white p-6 rounded shadow-lg">
        <div className="mb-6">
          <h3 className="text-xl font-medium">{orderData.product?.name}</h3>
          <img
            src={orderData.product?.image}
            alt={orderData.product?.name}
            className="w-32 h-32 object-cover rounded mt-2"
          />
          <p className="mt-2 text-gray-700">{orderData.product?.description}</p>
        </div>
        <div className="mb-6">
          <h4 className="font-medium">Customer Information</h4>
          <p className="mt-1">{orderData.name}</p>
          <p>{orderData.email}</p>
          <p>{orderData.phone}</p>
          <p>
            {orderData.address}, {orderData.city}, {orderData.zip}
          </p>
        </div>
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          >
            Edit
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={nextStep}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            Confirm Order
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default OrderSummary;

// components/ConfirmationStep.tsx
import React from "react";
import { useOrderFormContext } from "./context/OrderFormContext";

const ConfirmationStep: React.FC = () => {
  const { state } = useOrderFormContext();
  const { orderDetails, buyerDetails } = state;

  return (
    <section className="space-y-6" aria-labelledby="confirmation-heading">
      <h2
        id="confirmation-heading"
        className="text-3xl font-semibold text-green-800"
      >
        Order Confirmation
      </h2>
      <div className="p-6 border rounded-lg shadow-md bg-green-50">
        <h3 className="text-2xl font-medium text-green-700 mb-3">
          Order Details
        </h3>
        <p className="text-lg">
          <span className="font-semibold">Product:</span>{" "}
          {orderDetails.variant || "Not selected"}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Size:</span>{" "}
          {orderDetails.size || "Not selected"}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Quantity:</span>{" "}
          {orderDetails.quantity}
        </p>
      </div>
      <div className="p-6 border rounded-lg shadow-md">
        <h3 className="text-2xl font-medium text-green-700 mb-3">
          Buyer Details
        </h3>
        <p className="text-lg">
          <span className="font-semibold">Name:</span>{" "}
          {buyerDetails.name || "Not provided"}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Phone:</span>{" "}
          {buyerDetails.phone || "Not provided"}
        </p>
        {buyerDetails.email && (
          <p className="text-lg">
            <span className="font-semibold">Email:</span> {buyerDetails.email}
          </p>
        )}
        <p className="text-lg">
          <span className="font-semibold">Address:</span>{" "}
          {buyerDetails.address || "Not provided"}
        </p>
      </div>
    </section>
  );
};

export default ConfirmationStep;

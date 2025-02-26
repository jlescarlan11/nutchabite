// components/OrderDetailsStep.tsx
import React from "react";
import { useOrderFormContext } from "./context/OrderFormContext";

const OrderDetailsStep: React.FC = () => {
  const { state, dispatch } = useOrderFormContext();
  const { orderDetails } = state;
  const variants = ["Classic Nutcha Bite", "Matcha Fusion"];
  const sizes = ["Small", "Medium", "Large"];

  const updateField = (field: keyof typeof orderDetails, value: any) => {
    dispatch({ type: "SET_ORDER_DETAILS", payload: { [field]: value } });
  };

  const getPrice = () => {
    let basePrice = 5;
    if (orderDetails.size === "Medium") basePrice = 7;
    if (orderDetails.size === "Large") basePrice = 9;
    return basePrice * orderDetails.quantity;
  };

  return (
    <fieldset className="space-y-6" aria-labelledby="order-details-legend">
      <legend
        id="order-details-legend"
        className="text-3xl font-semibold text-green-800"
      >
        Order Details
      </legend>

      <div className="space-y-4">
        <p className="text-lg font-medium">Product Variant:</p>
        <div
          role="group"
          aria-label="Product Variant"
          className="flex space-x-4"
        >
          {variants.map((variant) => (
            <button
              key={variant}
              type="button"
              aria-pressed={orderDetails.variant === variant}
              onClick={() => updateField("variant", variant)}
              className={`px-5 py-2 border rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 ${
                orderDetails.variant === variant
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
            >
              {variant}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-lg font-medium">Size:</p>
        <div
          role="group"
          aria-label="Size Selection"
          className="flex space-x-4"
        >
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              aria-pressed={orderDetails.size === size}
              onClick={() => updateField("size", size)}
              className={`px-5 py-2 border rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 ${
                orderDetails.size === size
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-lg font-medium">Quantity:</p>
        <div className="flex items-center">
          <button
            type="button"
            onClick={() =>
              updateField("quantity", Math.max(1, orderDetails.quantity - 1))
            }
            aria-label="Decrease quantity"
            className="px-4 py-2 bg-gray-200 rounded-l-lg hover:bg-gray-300 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            -
          </button>
          <input
            type="number"
            aria-label="Quantity"
            value={orderDetails.quantity}
            onChange={(e) => updateField("quantity", Number(e.target.value))}
            className="w-20 text-center border-t border-b text-lg focus:outline-none"
          />
          <button
            type="button"
            onClick={() => updateField("quantity", orderDetails.quantity + 1)}
            aria-label="Increase quantity"
            className="px-4 py-2 bg-gray-200 rounded-r-lg hover:bg-gray-300 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            +
          </button>
        </div>
        <div className="p-6 border rounded-lg shadow-md transition-all duration-300 ease-in-out bg-green-50 mt-4">
          <h3 className="text-xl font-medium text-green-700 mb-2">
            Live Order Summary
          </h3>
          <p className="text-lg">
            <span className="font-semibold">Product:</span>{" "}
            {orderDetails.variant || "None selected"}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Size:</span>{" "}
            {orderDetails.size || "None selected"}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Quantity:</span>{" "}
            {orderDetails.quantity}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Total Price:</span> ${getPrice()}
          </p>
        </div>
      </div>
    </fieldset>
  );
};

export default OrderDetailsStep;

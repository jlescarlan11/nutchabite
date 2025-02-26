// components/BuyerDetailsStep.tsx
import React from "react";
import { useOrderFormContext } from "./context/OrderFormContext";
import PaymentDetails from "./PaymentDetails";

const BuyerDetailsStep: React.FC = () => {
  const { state, dispatch } = useOrderFormContext();
  const { buyerDetails } = state;

  const updateField = (field: keyof typeof buyerDetails, value: string) => {
    dispatch({ type: "SET_BUYER_DETAILS", payload: { [field]: value } });
  };

  return (
    <fieldset className="space-y-6" aria-labelledby="buyer-details-legend">
      <legend
        id="buyer-details-legend"
        className="text-3xl font-semibold text-green-800"
      >
        Buyer Details
      </legend>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="buyer-name"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Name
          </label>
          <input
            id="buyer-name"
            type="text"
            value={buyerDetails.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full border rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label
            htmlFor="buyer-phone"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Phone Number
          </label>
          <input
            id="buyer-phone"
            type="tel"
            value={buyerDetails.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className="w-full border rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="buyer-email"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Email (Optional)
          </label>
          <input
            id="buyer-email"
            type="email"
            value={buyerDetails.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="w-full border rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label
            htmlFor="buyer-address"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Delivery Address
          </label>
          <textarea
            id="buyer-address"
            value={buyerDetails.address}
            onChange={(e) => updateField("address", e.target.value)}
            className="w-full border rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
      {/* Integrate the modern PaymentDetails section */}
      <PaymentDetails />
    </fieldset>
  );
};

export default BuyerDetailsStep;

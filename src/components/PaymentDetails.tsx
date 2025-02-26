// components/PaymentDetails.tsx
import React from "react";
import { useFormContext } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { FiCreditCard, FiCalendar, FiLock } from "react-icons/fi";

// Define the shape of your form data
interface FormValues {
  buyerDetails: {
    cardNumber: string;
    expiry: string;
    cvv: string;
  };
}

const PaymentDetails: React.FC = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <div className="space-y-4">
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Payment Details
      </label>

      {/* Card Number */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FiCreditCard className="text-gray-400" />
        </span>
        <IMaskInput
          mask="0000 0000 0000 0000"
          placeholder="Card Number"
          onAccept={(value: string) =>
            setValue("buyerDetails.cardNumber", value)
          }
          className={`w-full pl-10 pr-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 ${
            errors.buyerDetails?.cardNumber
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-green-500"
          }`}
        />
        {errors.buyerDetails?.cardNumber && (
          <p className="text-red-500 text-sm mt-1">
            {errors.buyerDetails.cardNumber.message}
          </p>
        )}
      </div>

      <div className="flex space-x-4">
        {/* Expiry Date */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FiCalendar className="text-gray-400" />
          </span>
          <IMaskInput
            mask="00/00"
            placeholder="MM/YY"
            onAccept={(value: string) => setValue("buyerDetails.expiry", value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 ${
              errors.buyerDetails?.expiry
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-green-500"
            }`}
          />
          {errors.buyerDetails?.expiry && (
            <p className="text-red-500 text-sm mt-1">
              {errors.buyerDetails.expiry.message}
            </p>
          )}
        </div>

        {/* CVV */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FiLock className="text-gray-400" />
          </span>
          <IMaskInput
            mask="000"
            placeholder="CVV"
            onAccept={(value: string) => setValue("buyerDetails.cvv", value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 ${
              errors.buyerDetails?.cvv
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-green-500"
            }`}
          />
          {errors.buyerDetails?.cvv && (
            <p className="text-red-500 text-sm mt-1">
              {errors.buyerDetails.cvv.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;

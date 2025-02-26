// components/OrderForm.tsx
import React from "react";
import {
  OrderFormProvider,
  useOrderFormContext,
} from "./context/OrderFormContext";
import ProgressBar from "./ProgressBar";
import OrderDetailsStep from "./OrderDetailsStep";
import BuyerDetailsStep from "./BuyerDetailsStep";
import ConfirmationStep from "./ConfirmationStep";

const OrderFormContent: React.FC = () => {
  const { state, dispatch } = useOrderFormContext();
  const { step, orderSubmitted, orderNumber } = state;

  const nextStep = () => dispatch({ type: "NEXT_STEP" });
  const prevStep = () => dispatch({ type: "PREV_STEP" });
  const submitOrder = () => {
    const generatedOrderNumber = `ORD-${Math.floor(Math.random() * 100000)}`;
    dispatch({ type: "SUBMIT_ORDER", payload: generatedOrderNumber });
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      {/* Branding header */}
      <header className="text-center mb-10">
        <img
          src="/assets/nutcha-logo.png"
          alt="Nutcha Bites Logo"
          className="mx-auto w-16 h-16 mb-4"
        />
        <h1 className="text-4xl font-serif text-green-800 tracking-wide">
          Nutcha Bites
        </h1>
        <p className="text-lg text-gray-600">Iloilo Bandi Fusion with Matcha</p>
      </header>

      <ProgressBar step={step} />

      {orderSubmitted ? (
        <div className="text-center py-8">
          <h2 className="text-3xl font-bold text-green-700 mb-4">
            Thank you for your order!
          </h2>
          <p className="mb-2 text-lg">
            Order Number:{" "}
            <span className="font-mono text-xl">{orderNumber}</span>
          </p>
          <p className="text-lg">Estimated Delivery: 30-45 minutes</p>
        </div>
      ) : (
        <div className="space-y-8">
          {step === 1 && <OrderDetailsStep />}
          {step === 2 && <BuyerDetailsStep />}
          {step === 3 && <ConfirmationStep />}
          <div className="flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 bg-gray-200 rounded-lg text-gray-800 transition transform duration-300 ease-in-out hover:bg-gray-300 active:scale-95"
              >
                Back
              </button>
            )}
            <div className="ml-auto">
              {step < 3 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg transition transform duration-300 ease-in-out hover:bg-green-700 active:scale-95"
                >
                  Next
                </button>
              )}
              {step === 3 && (
                <button
                  type="button"
                  onClick={submitOrder}
                  className="px-6 py-3 bg-green-800 text-white rounded-lg transition transform duration-300 ease-in-out hover:bg-green-900 active:scale-95"
                >
                  Confirm Order
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const OrderForm: React.FC = () => {
  return (
    <OrderFormProvider>
      <OrderFormContent />
    </OrderFormProvider>
  );
};

export default OrderForm;

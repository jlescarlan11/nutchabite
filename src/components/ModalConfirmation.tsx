import React, { FC } from "react";

interface ModalConfirmationProps {
  isVisible: boolean;
  quantity: number;
  packaging?: string;
  onClose: () => void;
}

export const ModalConfirmation: FC<ModalConfirmationProps> = ({
  isVisible,
  quantity,
  onClose,
}) => {
  if (!isVisible) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-lg shadow-xl p-6 w-80 transform transition-all duration-300">
        <h2 id="modal-title" className="text-lg font-bold text-gray-800 mb-4">
          Success!
        </h2>
        <p className="text-gray-600 mb-6">
          {quantity} Nutcha Bites have been added to your cart.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        >
          OK
        </button>
      </div>
    </div>
  );
};

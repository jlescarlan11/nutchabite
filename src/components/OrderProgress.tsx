// src/components/ProgressBar.tsx
import React from "react";

interface ProgressBarProps {
  steps: string[];
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep }) => {
  return (
    <div
      className="flex justify-between items-center mb-8"
      role="progressbar"
      aria-valuenow={currentStep + 1}
      aria-valuemin={1}
      aria-valuemax={steps.length}
    >
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex-1 mx-1 p-2 text-center rounded-full transition-colors duration-300 
            ${
              index <= currentStep
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          tabIndex={0}
          aria-label={`Step ${index + 1}: ${step}`}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;

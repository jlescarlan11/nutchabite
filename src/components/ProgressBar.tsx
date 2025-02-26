// components/ProgressBar.tsx
import React from "react";

interface ProgressBarProps {
  step: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  const steps = ["Order Details", "Buyer Details", "Confirmation"];
  const totalSteps = steps.length;
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <nav aria-label="Order progress" className="mb-10">
      <div
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-valuetext={`Step ${step} of ${totalSteps}`}
        className="w-full bg-gray-300 rounded-full h-3 relative overflow-hidden"
      >
        <div
          className="bg-green-600 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <ol className="flex justify-between mt-2">
        {steps.map((label, index) => (
          <li
            key={index}
            className="text-base font-medium text-gray-700"
            aria-current={index + 1 === step ? "step" : undefined}
          >
            {label}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default ProgressBar;

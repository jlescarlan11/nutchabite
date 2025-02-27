// src/hooks/useWizard.ts
import { useState } from "react";

/**
 * Custom hook for wizard navigation.
 * @param totalSteps - Total number of steps in the wizard.
 */
export const useWizard = (totalSteps: number) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return { currentStep, nextStep, prevStep };
};

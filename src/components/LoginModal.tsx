// src/components/LoginModal.tsx
import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";
import Input from "./Input";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userName: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus management for accessibility: focus modal when opened
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  // Basic form validation
  const validateForm = (): boolean => {
    let valid = true;
    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address.");
      valid = false;
    } else {
      setEmailError("");
    }
    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    } else {
      setPasswordError("");
    }
    return valid;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    // Simulate successful login; in a real app, integrate with your auth service.
    onLoginSuccess(email);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      ref={modalRef}
      tabIndex={-1}
    >
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 id="login-modal-title" className="text-xl font-semibold">
            Login / Signup
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close Login Modal"
          >
            &times;
          </button>
        </div>
        <p className="text-sm mb-4">
          Savor the blend of matcha goodness and Iloilo tradition!
        </p>
        <form onSubmit={handleLogin} noValidate>
          <Input
            label="Email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            aria-required="true"
          />
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            aria-required="true"
          />
          <Button
            type="submit"
            label="Login"
            className="w-full bg-green-600 text-white hover:bg-green-700"
            aria-label="Submit Login"
          />
        </form>
        <div className="mt-4 flex justify-center space-x-2">
          <Button
            label="Facebook"
            className="bg-blue-600 text-white hover:bg-blue-700"
          />
          <Button
            label="Google"
            className="bg-red-600 text-white hover:bg-red-700"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

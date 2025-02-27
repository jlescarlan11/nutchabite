import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

/* --- Custom Animations --- */
// Keyframe for a subtle matcha steam effect
const steamAnimation = keyframes`
  0% { opacity: 0; transform: translateY(0); }
  50% { opacity: 0.8; transform: translateY(-10px); }
  100% { opacity: 0; transform: translateY(-20px); }
`;

// Fade in animation for step transitions
const fadeIn = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
`;

// Shake animation for input validation errors
const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

/* --- Styled Components --- */
// Visually hidden element for screen reader only text
const VisuallyHidden = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`;

// Skip link for enhanced keyboard navigation
const SkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 0;
  background: #8bc34a;
  color: #fff;
  padding: 8px;
  z-index: 100;
  &:focus {
    top: 0;
  }
`;

// Wrapper to offset the fixed NavBar and set overall background
const FormWrapper = styled.div`
  padding-top: 80px;
  background: #f5fff5;
  min-height: 100vh;
  font-family: "Helvetica Neue", Arial, sans-serif;
  position: relative;
`;

// Main container with subtle bandi-inspired background pattern
const FormContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  background-image: url("bandi-pattern.png");
  background-size: cover;
  background-repeat: no-repeat;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

// Progress bar and step indicators
const ProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const StepIndicator = styled.div<{ active: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) => (props.active ? "#8bc34a" : "#ddd")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
`;

// Dynamic progress bar for real-time feedback in Step 2
const DynamicProgressBarContainer = styled.div`
  background: #eee;
  border-radius: 4px;
  width: 100%;
  height: 8px;
  margin-bottom: 1rem;
`;

const DynamicProgressBar = styled.div<{ progress: number }>`
  background: #8bc34a;
  height: 100%;
  width: ${(props) => props.progress}%;
  border-radius: 4px;
  transition: width 0.3s ease;
`;

// Button component with dynamic feedback
interface ButtonProps {
  primary?: boolean;
}
const Button = styled.button<ButtonProps>`
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 4px;
  background: ${(props) => (props.primary ? "#8bc34a" : "#ccc")};
  color: ${(props) => (props.primary ? "#fff" : "#333")};
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.1s ease, background 0.3s;
  margin: 0 0.5rem;
  &:hover {
    background: ${(props) => (props.primary ? "#7cb342" : "#b3b3b3")};
  }
  &:active {
    transform: scale(0.98);
  }
  &:focus {
    outline: 2px solid #000;
  }
`;

// Input component with interactive validation feedback
interface InputProps {
  error?: boolean;
}
const Input = styled.input<InputProps>`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 0.5rem;
  border: 1px solid ${(props) => (props.error ? "red" : "#ccc")};
  border-radius: 4px;
  font-size: 1rem;
  animation: ${(props) => (props.error ? shake : "none")} 0.3s;
`;

// TextArea with interactive validation feedback
interface TextAreaProps {
  error?: boolean;
}
const TextArea = styled.textarea<TextAreaProps>`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 0.5rem;
  border: 1px solid ${(props) => (props.error ? "red" : "#ccc")};
  border-radius: 4px;
  font-size: 1rem;
  animation: ${(props) => (props.error ? shake : "none")} 0.3s;
`;

// Container for inputs to display context-sensitive tooltips
const InputContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const Tooltip = styled.div`
  position: absolute;
  background: #333;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.875rem;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
  z-index: 10;
  top: -35px;
  left: 0;
  ${InputContainer}:hover &,
  ${InputContainer}:focus-within & {
    opacity: 1;
  }
`;

// Decorative steam element for visual enhancement
const Steam = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  background: rgba(139, 195, 74, 0.5);
  border-radius: 50%;
  animation: ${steamAnimation} 2s infinite;
`;

// Animated section wrapper for step transitions with accessible region role
const StepSection = styled.section`
  animation: ${fadeIn} 0.5s ease-in-out;
  outline: none;
`;

const OrderForm = () => {
  // State for managing wizard step and live updates
  const [currentStep, setCurrentStep] = useState(1);
  const [liveMessage, setLiveMessage] = useState("");

  interface Customer {
    name: string;
    email: string;
    phone: string;
    address: string;
  }

  interface CustomerErrors {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  }

  // State for product details (Step 1)
  const [product, setProduct] = useState({
    size: "Medium",
    quantity: 1,
    price: 5.99,
    image: "matcha-bites.jpg",
  });

  // State for customer details (Step 2) with inline validation errors
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState<CustomerErrors>({});

  // State for order confirmation (Step 3)
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderRef, setOrderRef] = useState("");

  // Refs for focus management
  const nameInputRef = useRef<HTMLInputElement>(null);
  const stepSectionRef = useRef<HTMLElement>(null);

  // Compute progress for Step 2 (Customer Information)
  const totalFields = 4;
  const filledFields = Object.values(customer).filter(
    (val) => val.trim() !== ""
  ).length;
  const progressPercentage = Math.round((filledFields / totalFields) * 100);

  useEffect(() => {
    let message = "";
    if (orderConfirmed) {
      message = "Order confirmed. Thank you for your order!";
    } else {
      switch (currentStep) {
        case 1:
          message = "Step 1 of 3: Product Details";
          break;
        case 2:
          message = "Step 2 of 3: Customer Information";
          break;
        case 3:
          message = "Step 3 of 3: Order Summary";
          break;
        default:
          break;
      }
    }
    setLiveMessage(message);
    if (stepSectionRef.current) {
      stepSectionRef.current.focus();
    }
    if (currentStep === 2 && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [currentStep, orderConfirmed]);

  /* --- Event Handlers --- */
  const handleProductChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    let newPrice = product.price;
    if (name === "size") {
      const priceMap: Record<"Small" | "Medium" | "Large", number> = {
        Small: 4.99,
        Medium: 5.99,
        Large: 6.99,
      };
      newPrice = priceMap[value as keyof typeof priceMap];
    }
    setProduct((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value, 10) : value,
      price: newPrice,
    }));
  };

  const handleCustomerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CustomerErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateCustomerInfo = () => {
    let newErrors: CustomerErrors = {};
    if (!customer.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!/\S+@\S+\.\S+/.test(customer.email)) {
      newErrors.email = "Valid email is required.";
    }
    if (!customer.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }
    if (!customer.address.trim()) {
      newErrors.address = "Delivery address is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (currentStep === 2 && !validateCustomerInfo()) return;
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  /* --- IndexedDB Offline Data Persistence --- */
  const saveOrderToIndexedDB = async (order: any) => {
    try {
      const dbRequest = window.indexedDB.open("NutchaBitesDB", 1);
      dbRequest.onupgradeneeded = function (event) {
        const request = event.target as IDBOpenDBRequest;
        const db = request.result;
        if (!db.objectStoreNames.contains("orders")) {
          db.createObjectStore("orders", { keyPath: "orderRef" });
        }
      };
      dbRequest.onerror = function (event) {
        const request = event.target as IDBOpenDBRequest;
        console.error("IndexedDB error:", request.error);
      };
      dbRequest.onsuccess = function (event) {
        const request = event.target as IDBOpenDBRequest;
        const db = request.result;
        const tx = db.transaction("orders", "readwrite");
        const store = tx.objectStore("orders");
        store.add(order);
        tx.oncomplete = function () {
          db.close();
        };
      };
    } catch (error) {
      console.error("Error saving order to IndexedDB:", error);
    }
  };

  const confirmOrder = () => {
    const reference = `NB-${Date.now()}`;
    setOrderRef(reference);
    const orderData = {
      orderRef: reference,
      userId: customer.email || "guest",
      timestamp: new Date().toISOString(),
      product,
      customer,
    };
    saveOrderToIndexedDB(orderData);
    setOrderConfirmed(true);
  };

  /* --- Render Component --- */
  return (
    <FormWrapper>
      <SkipLink href="#order-form">Skip to Order Form</SkipLink>
      <VisuallyHidden aria-live="polite">{liveMessage}</VisuallyHidden>
      <FormContainer
        id="order-form"
        role="form"
        aria-labelledby="order-form-title"
      >
        <h1
          id="order-form-title"
          style={{ color: "#2e7d32", textAlign: "center" }}
        >
          Nutcha Bites Order Form
        </h1>
        <ProgressBar aria-label="Order progress">
          <StepIndicator active={currentStep >= 1}>1</StepIndicator>
          <StepIndicator active={currentStep >= 2}>2</StepIndicator>
          <StepIndicator active={currentStep >= 3}>3</StepIndicator>
        </ProgressBar>

        {!orderConfirmed ? (
          <>
            {currentStep === 1 && (
              <StepSection
                role="region"
                aria-labelledby="product-details-heading"
                tabIndex={-1}
                ref={stepSectionRef}
              >
                <h2 id="product-details-heading" style={{ color: "#2e7d32" }}>
                  Product Details
                </h2>
                <img
                  src={product.image}
                  alt="Nutcha Bites – Matcha & Bandi"
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                  }}
                />
                <div>
                  <label htmlFor="size">Size:</label>
                  <select
                    id="size"
                    name="size"
                    value={product.size}
                    onChange={handleProductChange}
                    aria-label="Select product size"
                  >
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                  </select>
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    value={product.quantity}
                    onChange={handleProductChange}
                    aria-label="Select quantity"
                  />
                </div>
                <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
                  Price: ${product.price * product.quantity}
                </p>
                <Button
                  primary
                  onClick={nextStep}
                  aria-label="Proceed to customer information"
                >
                  Next
                </Button>
              </StepSection>
            )}

            {currentStep === 2 && (
              <StepSection
                role="region"
                aria-labelledby="customer-info-heading"
                tabIndex={-1}
                ref={stepSectionRef}
              >
                <h2 id="customer-info-heading" style={{ color: "#2e7d32" }}>
                  Customer Information
                </h2>
                {/* Dynamic progress indicator for customer info */}
                <DynamicProgressBarContainer
                  aria-label={`Form completion ${progressPercentage}%`}
                >
                  <DynamicProgressBar progress={progressPercentage} />
                </DynamicProgressBarContainer>
                <InputContainer>
                  <label htmlFor="name">Name:</label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={customer.name}
                    onChange={handleCustomerChange}
                    placeholder="Your full name"
                    aria-required="true"
                    aria-invalid={errors.name ? "true" : "false"}
                    ref={nameInputRef}
                    error={!!errors.name}
                  />
                  <Tooltip role="tooltip">
                    {errors.name ? errors.name : "Enter your full name"}
                  </Tooltip>
                </InputContainer>
                <InputContainer>
                  <label htmlFor="email">Email:</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={customer.email}
                    onChange={handleCustomerChange}
                    placeholder="example@domain.com"
                    aria-required="true"
                    aria-invalid={errors.email ? "true" : "false"}
                    error={!!errors.email}
                  />
                  <Tooltip role="tooltip">
                    {errors.email
                      ? errors.email
                      : "Enter a valid email address"}
                  </Tooltip>
                </InputContainer>
                <InputContainer>
                  <label htmlFor="phone">Phone:</label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={customer.phone}
                    onChange={handleCustomerChange}
                    placeholder="Your phone number"
                    aria-required="true"
                    aria-invalid={errors.phone ? "true" : "false"}
                    error={!!errors.phone}
                  />
                  <Tooltip role="tooltip">
                    {errors.phone ? errors.phone : "Enter your phone number"}
                  </Tooltip>
                </InputContainer>
                <InputContainer>
                  <label htmlFor="address">Delivery Address:</label>
                  <TextArea
                    id="address"
                    name="address"
                    value={customer.address}
                    onChange={handleCustomerChange}
                    placeholder="Your delivery address"
                    rows={3}
                    aria-required="true"
                    aria-invalid={errors.address ? "true" : "false"}
                    error={!!errors.address}
                  />
                  <Tooltip role="tooltip">
                    {errors.address
                      ? errors.address
                      : "Enter your delivery address"}
                  </Tooltip>
                </InputContainer>
                <div
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    onClick={prevStep}
                    aria-label="Return to product details"
                  >
                    Previous
                  </Button>
                  <Button
                    primary
                    onClick={nextStep}
                    aria-label="Proceed to order summary"
                  >
                    Next
                  </Button>
                </div>
              </StepSection>
            )}

            {currentStep === 3 && (
              <StepSection
                role="region"
                aria-labelledby="order-summary-heading"
                tabIndex={-1}
                ref={stepSectionRef}
              >
                <h2 id="order-summary-heading" style={{ color: "#2e7d32" }}>
                  Order Summary
                </h2>
                <div style={{ marginBottom: "1rem" }}>
                  <p>
                    <strong>Product:</strong> Nutcha Bites
                  </p>
                  <p>
                    <strong>Size:</strong> {product.size}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {product.quantity}
                  </p>
                  <p>
                    <strong>Price:</strong> ${product.price * product.quantity}
                  </p>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <h3>Customer Details</h3>
                  <p>
                    <strong>Name:</strong> {customer.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {customer.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {customer.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {customer.address}
                  </p>
                </div>
                <div
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    onClick={prevStep}
                    aria-label="Return to customer information"
                  >
                    Previous
                  </Button>
                  <Button
                    primary
                    onClick={confirmOrder}
                    aria-label="Confirm order"
                  >
                    Confirm Order
                  </Button>
                </div>
              </StepSection>
            )}
          </>
        ) : (
          <StepSection
            role="region"
            aria-labelledby="order-confirmation-heading"
            tabIndex={-1}
            ref={stepSectionRef}
            style={{ textAlign: "center" }}
          >
            <h2 id="order-confirmation-heading" style={{ color: "#2e7d32" }}>
              Thank You for Your Order!
            </h2>
            <p>
              Your order reference is <strong>{orderRef}</strong>
            </p>
            <p>A confirmation email has been sent to {customer.email}.</p>
            <div style={{ marginTop: "1rem" }}>
              <Button onClick={() => window.print()} aria-label="Print receipt">
                Print Receipt
              </Button>
              <Button
                onClick={() => alert("Receipt saved as PDF")}
                aria-label="Save receipt as PDF"
              >
                Save Receipt
              </Button>
            </div>
          </StepSection>
        )}
      </FormContainer>
      {/* Decorative animated steam effect */}
      <Steam aria-hidden="true" />
    </FormWrapper>
  );
};

export default OrderForm;

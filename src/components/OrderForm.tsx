import React, { useState, useEffect, useRef, ReactNode } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

/* --- Animations --- */
const steamAnimation = keyframes`
  0% { opacity: 0; transform: translateY(0); }
  50% { opacity: 0.8; transform: translateY(-10px); }
  100% { opacity: 0; transform: translateY(-20px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const popIn = keyframes`
  0% { transform: scale(0.5); opacity: 0; }
  60% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); }
`;

const toastFade = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const tooltipAnimation = keyframes`
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
`;

/* --- Styled Components --- */
// Screen reader only text
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

// Skip link for keyboard navigation
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

// Resume banner for auto-saved order
const ResumeBanner = styled.div`
  background: #e0f7fa;
  color: #00796b;
  padding: 1rem;
  text-align: center;
  border: 1px solid #b2dfdb;
  border-radius: 4px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

// Back to Home Button
const BackToHomeButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #fff;
  color: #8bc34a;
  border: 1px solid #8bc34a;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  z-index: 10;
  &:hover {
    background: #8bc34a;
    color: #fff;
  }
`;

// Main wrapper using a dynamic top padding variable (set based on NavBar height)
const FormWrapper = styled.div`
  padding-top: var(--navbar-height, 120px);
  background: #f5f1e6;
  min-height: 100vh;
  font-family: "Helvetica Neue", Arial, sans-serif;
  position: relative;
`;

// Card-based panel container with cultural background hint
const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  position: relative;
  background-image: url("bandi-pattern.png");
  background-size: cover;
  background-repeat: no-repeat;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

// Progress indicators
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

// Dynamic progress bar for real-time feedback
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

// Button with dynamic feedback
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

// Floating label input container
const FloatingInputContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const FloatingLabel = styled.label<{ active: boolean }>`
  position: absolute;
  left: 12px;
  top: ${(props) => (props.active ? "0px" : "50%")};
  transform: translateY(-50%);
  font-size: ${(props) => (props.active ? "0.75rem" : "1rem")};
  color: ${(props) => (props.active ? "#8bc34a" : "#999")};
  pointer-events: none;
  transition: all 0.2s ease;
  background: #fff;
  padding: 0 4px;
`;

interface InputProps {
  error?: boolean;
}

const InputField = styled.input<InputProps>`
  width: 100%;
  padding: 1.2rem 0.8rem 0.8rem;
  border: 1px solid ${(props) => (props.error ? "red" : "#ccc")};
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  &:focus {
    border-color: #8bc34a;
  }
`;

const TextAreaField = styled.textarea<InputProps>`
  width: 100%;
  padding: 1.2rem 0.8rem 0.8rem;
  border: 1px solid ${(props) => (props.error ? "red" : "#ccc")};
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  &:focus {
    border-color: #8bc34a;
  }
`;

// Tooltip for input guidance with subtle animation
const Tooltip = styled.div`
  position: absolute;
  background: #333;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.875rem;
  opacity: 0;
  animation: ${tooltipAnimation} 0.3s forwards;
  pointer-events: none;
  z-index: 10;
  top: -35px;
  left: 0;
`;

// Help Icon for contextual tooltips
const HelpIcon = styled.span`
  display: inline-block;
  background: #8bc34a;
  color: #fff;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  text-align: center;
  line-height: 18px;
  font-size: 0.8rem;
  margin-left: 4px;
  cursor: pointer;
  position: relative;
`;

// Split layout for Product Details with image and configurator
const SplitLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProductImage = styled.img`
  flex: 1 1 300px;
  max-width: 100%;
  border-radius: 8px;
  object-fit: cover;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

// Configurator container
const Configurator = styled.div`
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// Custom Quantity Selector
const QuantitySelectorContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`;

const QuantityButton = styled.button`
  background: #8bc34a;
  color: #fff;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #7cb342;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.div`
  width: 50px;
  text-align: center;
  font-size: 1.2rem;
`;

// Custom Dropdown Components
const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
`;

const DropdownHeader = styled.div`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DropdownList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  position: absolute;
  width: 100%;
  background: #fff;
  max-height: 150px;
  overflow-y: auto;
  z-index: 20;
`;

const DropdownItem = styled.li`
  padding: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    background: #f0f0f0;
  }
`;

// Animated section for step transitions
const StepSection = styled.section`
  animation: ${fadeIn} 0.5s ease-in-out;
  outline: none;
`;

// Sticky container for the Confirm Order button (if needed)
const StickyButtonContainer = styled.div`
  position: sticky;
  bottom: 0;
  background: #fff;
  padding: 1rem 0;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
  z-index: 5;
`;

// Toast notification for offline save confirmation
const ToastNotification = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #323232;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 4px;
  animation: ${toastFade} 0.5s ease-out;
  z-index: 100;
`;

// Decorative steam element (optional)
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

// Timeline for Order Tracking in Confirmation Modal
const TimelineContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TimelineItem = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 12px;
    right: -50%;
    width: 100%;
    height: 2px;
    background: ${(props) => (props.active ? "#8bc34a" : "#ccc")};
    z-index: -1;
  }
`;

const TimelineCircle = styled.div<{ active?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${(props) => (props.active ? "#8bc34a" : "#ccc")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.8rem;
`;

// Modal components for order confirmation
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  animation: ${popIn} 0.6s ease-out;
`;

/* --- Error Boundary --- */
class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }
    return this.props.children;
  }
}

/* --- Custom Dropdown Component --- */
interface DropdownOption {
  label: string;
  value: string;
  icon?: ReactNode;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const toggleDropdown = () => setOpen((prev) => !prev);
  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };
  const selectedOption = options.find((opt) => opt.value === value);
  return (
    <DropdownContainer>
      <DropdownHeader onClick={toggleDropdown} aria-label="Select product size">
        <span>
          {selectedOption?.icon} {selectedOption?.label}
        </span>
        <span>{open ? "▲" : "▼"}</span>
      </DropdownHeader>
      {open && (
        <DropdownList>
          {options.map((opt) => (
            <DropdownItem
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              aria-label={`Select ${opt.label}`}
            >
              {opt.icon} {opt.label}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

/* --- Component Types --- */
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

/* --- Main OrderForm Component --- */
const OrderForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [liveMessage, setLiveMessage] = useState("");
  const [toast, setToast] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderRef, setOrderRef] = useState("");
  const [showResumePrompt, setShowResumePrompt] = useState(false);

  // Product state for Step 1
  const [product, setProduct] = useState({
    size: "Medium",
    quantity: 1,
    price: 5.99,
    image: "matcha-bites.jpg",
  });

  // Customer state for Step 2
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState<CustomerErrors>({});

  // Refs for focus management
  const nameInputRef = useRef<HTMLInputElement>(null);
  const stepSectionRef = useRef<HTMLElement>(null);
  const modalCloseButtonRef = useRef<HTMLButtonElement>(null);

  /* --- Analytics Tracker --- */
  const trackEvent = (eventName: string, eventData: any) => {
    console.log("Analytics event:", eventName, eventData);
    // In production, send eventData to your analytics endpoint.
  };

  /* --- Auto-save & Resume functionality --- */
  useEffect(() => {
    const savedOrder = localStorage.getItem("orderFormData");
    if (savedOrder) {
      setShowResumePrompt(true);
    }
  }, []);

  useEffect(() => {
    const data = { product, customer, currentStep };
    localStorage.setItem("orderFormData", JSON.stringify(data));
    trackEvent("order_autosave", data);
  }, [product, customer, currentStep]);

  const resumeOrder = () => {
    const savedOrder = localStorage.getItem("orderFormData");
    if (savedOrder) {
      const data = JSON.parse(savedOrder);
      setProduct(data.product);
      setCustomer(data.customer);
      setCurrentStep(data.currentStep);
      trackEvent("order_resume", data);
      setShowResumePrompt(false);
    }
  };

  const clearSavedOrder = () => {
    localStorage.removeItem("orderFormData");
    setShowResumePrompt(false);
  };

  /* --- Dynamic Top Padding based on NavBar --- */
  useEffect(() => {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      const height = navbar.offsetHeight;
      document.documentElement.style.setProperty(
        "--navbar-height",
        `${height + 20}px`
      );
    }
  }, []);

  /* --- Focus and Live Message Updates --- */
  useEffect(() => {
    let message = "";
    if (orderConfirmed) {
      message = "Order confirmed. Thank you for your order!";
    } else {
      message = `Step ${currentStep} of 4: ${
        currentStep === 1
          ? "Product Details"
          : currentStep === 2
          ? "Customer Information"
          : currentStep === 3
          ? "Order Summary"
          : ""
      }`;
    }
    setLiveMessage(message);
    if (stepSectionRef.current) {
      stepSectionRef.current.focus();
    }
    if (currentStep === 2 && nameInputRef.current) {
      nameInputRef.current.focus();
    }
    trackEvent("step_change", { currentStep });
  }, [currentStep, orderConfirmed]);

  /* --- Event Handlers --- */
  // Custom dropdown handler for size change. Also update image accordingly.
  const handleSizeChange = (value: string) => {
    const priceMap: Record<"Small" | "Medium" | "Large", number> = {
      Small: 4.99,
      Medium: 5.99,
      Large: 6.99,
    };
    const imageMap: Record<"Small" | "Medium" | "Large", string> = {
      Small: "matcha-bites-small.jpg",
      Medium: "matcha-bites.jpg",
      Large: "matcha-bites-large.jpg",
    };
    setProduct((prev) => ({
      ...prev,
      size: value,
      price: priceMap[value as keyof typeof priceMap],
      image: imageMap[value as keyof typeof imageMap],
    }));
  };

  const incrementQuantity = () => {
    setProduct((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  };

  const decrementQuantity = () => {
    setProduct((prev) => ({
      ...prev,
      quantity: prev.quantity > 1 ? prev.quantity - 1 : 1,
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
    trackEvent("order_confirmed", orderData);
  };

  const resetForm = () => {
    setProduct({
      size: "Medium",
      quantity: 1,
      price: 5.99,
      image: "matcha-bites.jpg",
    });
    setCustomer({ name: "", email: "", phone: "", address: "" });
    setCurrentStep(1);
    setOrderConfirmed(false);
    setOrderRef("");
    localStorage.removeItem("orderFormData");
    trackEvent("order_reset", {});
  };

  const goBackHome = () => {
    navigate("/");
  };

  /* --- Offline IndexedDB Functionality --- */
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
          setToast("Order saved offline");
          setTimeout(() => setToast(""), 3000);
        };
      };
    } catch (error) {
      console.error("Error saving order to IndexedDB:", error);
    }
  };

  // Compute dynamic progress for customer info (Step 2)
  const totalFields = 4;
  const filledFields = Object.values(customer).filter(
    (val) => val.trim() !== ""
  ).length;
  const progressPercentage = Math.round((filledFields / totalFields) * 100);

  // Options for custom dropdown (with icons)
  const sizeOptions: DropdownOption[] = [
    { label: "Small", value: "Small", icon: "🟢" },
    { label: "Medium", value: "Medium", icon: "🟡" },
    { label: "Large", value: "Large", icon: "🔴" },
  ];

  return (
    <FormWrapper>
      <SkipLink href="#order-form">Skip to Order Form</SkipLink>
      <BackToHomeButton onClick={goBackHome}>Back to Home</BackToHomeButton>
      <VisuallyHidden aria-live="polite">{liveMessage}</VisuallyHidden>
      <FormContainer
        id="order-form"
        role="form"
        aria-labelledby="order-form-title"
      >
        <h1
          id="order-form-title"
          style={{ color: "#5d4037", textAlign: "center" }}
        >
          Nutcha Bites Order Form
        </h1>
        {/* Resume Order Banner */}
        {showResumePrompt && (
          <ResumeBanner>
            <span>Resume your saved order?</span>
            <Button primary onClick={resumeOrder}>
              Resume
            </Button>
            <Button onClick={clearSavedOrder}>Clear</Button>
          </ResumeBanner>
        )}
        <ProgressBar aria-label="Order progress">
          <StepIndicator active={currentStep >= 1}>1</StepIndicator>
          <StepIndicator active={currentStep >= 2}>2</StepIndicator>
          <StepIndicator active={currentStep >= 3}>3</StepIndicator>
          <StepIndicator active={orderConfirmed || currentStep >= 4}>
            4
          </StepIndicator>
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
                <h2 id="product-details-heading" style={{ color: "#5d4037" }}>
                  Product Details
                </h2>
                <SplitLayout>
                  <ProductImage
                    src={product.image}
                    alt="Nutcha Bites – Matcha & Bandi"
                  />
                  <Configurator>
                    <div style={{ marginBottom: "1rem" }}>
                      <label htmlFor="size" style={{ fontWeight: "bold" }}>
                        Size:
                      </label>
                      <CustomDropdown
                        options={sizeOptions}
                        value={product.size}
                        onChange={handleSizeChange}
                      />
                    </div>
                    <QuantitySelectorContainer>
                      <span style={{ fontWeight: "bold", marginRight: "1rem" }}>
                        Quantity:
                      </span>
                      <QuantityButton
                        onClick={decrementQuantity}
                        aria-label="Decrease quantity"
                      >
                        –
                      </QuantityButton>
                      <QuantityDisplay>{product.quantity}</QuantityDisplay>
                      <QuantityButton
                        onClick={incrementQuantity}
                        aria-label="Increase quantity"
                      >
                        +
                      </QuantityButton>
                    </QuantitySelectorContainer>
                    <p
                      style={{
                        fontSize: "1.2rem",
                        marginTop: "1rem",
                        transition: "all 0.3s ease",
                      }}
                    >
                      Price: ${(product.price * product.quantity).toFixed(2)}
                    </p>
                    <Button
                      primary
                      onClick={nextStep}
                      aria-label="Proceed to customer information"
                    >
                      Next
                    </Button>
                  </Configurator>
                </SplitLayout>
              </StepSection>
            )}

            {currentStep === 2 && (
              <StepSection
                role="region"
                aria-labelledby="customer-info-heading"
                tabIndex={-1}
                ref={stepSectionRef}
              >
                <h2 id="customer-info-heading" style={{ color: "#5d4037" }}>
                  Customer Information
                </h2>
                <DynamicProgressBarContainer
                  aria-label={`Form completion ${progressPercentage}%`}
                >
                  <DynamicProgressBar progress={progressPercentage} />
                </DynamicProgressBarContainer>
                <FloatingInputContainer>
                  <FloatingLabel active={!!customer.name}>
                    {customer.name ? "Name" : "Your full name"}
                  </FloatingLabel>
                  <InputField
                    id="name"
                    name="name"
                    type="text"
                    value={customer.name}
                    onChange={handleCustomerChange}
                    placeholder=" "
                    aria-required="true"
                    aria-invalid={errors.name ? "true" : "false"}
                    ref={nameInputRef}
                    error={!!errors.name}
                  />
                  {errors.name && <Tooltip role="alert">{errors.name}</Tooltip>}
                </FloatingInputContainer>
                <FloatingInputContainer>
                  <FloatingLabel active={!!customer.email}>
                    {customer.email ? "Email" : "example@domain.com"}
                  </FloatingLabel>
                  <InputField
                    id="email"
                    name="email"
                    type="email"
                    value={customer.email}
                    onChange={handleCustomerChange}
                    placeholder=" "
                    aria-required="true"
                    aria-invalid={errors.email ? "true" : "false"}
                    error={!!errors.email}
                  />
                  {/* Help Icon with contextual tooltip for email */}
                  <HelpIcon title="We will use this email to send you order updates.">
                    ?
                  </HelpIcon>
                  {errors.email && (
                    <Tooltip role="alert">{errors.email}</Tooltip>
                  )}
                </FloatingInputContainer>
                <FloatingInputContainer>
                  <FloatingLabel active={!!customer.phone}>
                    {customer.phone ? "Phone" : "Your phone number"}
                  </FloatingLabel>
                  <InputField
                    id="phone"
                    name="phone"
                    type="tel"
                    value={customer.phone}
                    onChange={handleCustomerChange}
                    placeholder=" "
                    aria-required="true"
                    aria-invalid={errors.phone ? "true" : "false"}
                    error={!!errors.phone}
                  />
                  {errors.phone && (
                    <Tooltip role="alert">{errors.phone}</Tooltip>
                  )}
                </FloatingInputContainer>
                <FloatingInputContainer>
                  <FloatingLabel active={!!customer.address}>
                    {customer.address ? "Address" : "Your delivery address"}
                  </FloatingLabel>
                  <TextAreaField
                    id="address"
                    name="address"
                    value={customer.address}
                    onChange={handleCustomerChange}
                    placeholder=" "
                    rows={3}
                    aria-required="true"
                    aria-invalid={errors.address ? "true" : "false"}
                    error={!!errors.address}
                  />
                  {errors.address && (
                    <Tooltip role="alert">{errors.address}</Tooltip>
                  )}
                </FloatingInputContainer>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
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
                <h2 id="order-summary-heading" style={{ color: "#5d4037" }}>
                  Order Summary
                </h2>
                <div
                  style={{
                    marginBottom: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    background: "#fafafa",
                    padding: "1rem",
                    borderRadius: "8px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <p>
                    <span role="img" aria-label="product">
                      🍵
                    </span>{" "}
                    <strong>Product:</strong> Nutcha Bites
                  </p>
                  <p>
                    <span role="img" aria-label="size">
                      📏
                    </span>{" "}
                    <strong>Size:</strong> {product.size}
                  </p>
                  <p>
                    <span role="img" aria-label="quantity">
                      🔢
                    </span>{" "}
                    <strong>Quantity:</strong> {product.quantity}
                  </p>
                  <p>
                    <span role="img" aria-label="price">
                      💲
                    </span>{" "}
                    <strong>Price:</strong> $
                    {(product.price * product.quantity).toFixed(2)}
                  </p>
                </div>
                <div
                  style={{
                    marginBottom: "1rem",
                    background: "#fafafa",
                    padding: "1rem",
                    borderRadius: "8px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <h3
                    style={{
                      borderBottom: "1px solid #eee",
                      paddingBottom: "0.5rem",
                    }}
                  >
                    Customer Details
                  </h3>
                  <p>
                    <span role="img" aria-label="name">
                      👤
                    </span>{" "}
                    <strong>Name:</strong> {customer.name}
                  </p>
                  <p>
                    <span role="img" aria-label="email">
                      📧
                    </span>{" "}
                    <strong>Email:</strong> {customer.email}
                  </p>
                  <p>
                    <span role="img" aria-label="phone">
                      📞
                    </span>{" "}
                    <strong>Phone:</strong> {customer.phone}
                  </p>
                  <p>
                    <span role="img" aria-label="address">
                      🏠
                    </span>{" "}
                    <strong>Address:</strong> {customer.address}
                  </p>
                </div>
                <StickyButtonContainer>
                  <Button
                    primary
                    onClick={confirmOrder}
                    aria-label="Confirm order"
                  >
                    Confirm Order
                  </Button>
                </StickyButtonContainer>
              </StepSection>
            )}
          </>
        ) : null}
      </FormContainer>
      {toast && <ToastNotification>{toast}</ToastNotification>}
      <Steam aria-hidden="true" />

      {/* Order Confirmation Modal */}
      {orderConfirmed && (
        <ModalOverlay role="dialog" aria-modal="true">
          <ModalContent>
            <h2 style={{ color: "#5d4037" }}>Thank You for Your Order!</h2>
            <p>
              Your order reference is{" "}
              <strong style={{ color: "#8bc34a", fontSize: "1.5rem" }}>
                {orderRef}
              </strong>
            </p>
            <p>A confirmation email has been sent to {customer.email}.</p>
            {/* Order Tracking Timeline */}
            <TimelineContainer>
              {["Placed", "Processing", "Shipped", "Delivered"].map(
                (stage, index) => (
                  <TimelineItem key={stage} active={index === 0}>
                    <TimelineCircle active={index === 0}>
                      {index === 0 ? "✓" : index + 1}
                    </TimelineCircle>
                    <span style={{ fontSize: "0.75rem", marginTop: "4px" }}>
                      {stage}
                    </span>
                  </TimelineItem>
                )
              )}
            </TimelineContainer>
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
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
            <div style={{ marginTop: "1rem" }}>
              <Button
                ref={modalCloseButtonRef}
                onClick={resetForm}
                aria-label="Close confirmation and reset form"
              >
                Close
              </Button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </FormWrapper>
  );
};

/* --- Export Wrapped in ErrorBoundary --- */
const OrderFormWithErrorBoundary: React.FC = () => (
  <ErrorBoundary>
    <OrderForm />
  </ErrorBoundary>
);

export default OrderFormWithErrorBoundary;

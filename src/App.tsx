// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import heroImage from "./assets/HeroImage.webp";
import NavBar from "./components/NavBar";
import Overview from "./components/Overview";
import ScrollToHash from "./components/ScrollToHash";
import Recipe from "./components/Recipe";
import Vision from "./components/Vision";
import Testimonial from "./components/Testimonial";
import FAQ from "./components/FAQ";
import ContactNewsletter from "./components/ContactNewsletter";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import ProgressBar from "./components/OrderProgress";
import ProductSelection from "./components/ProductSelection";
import CustomerInformation from "./components/CustomerInformation";
import OrderSummary from "./components/OrderSummary";
import OrderConfirmation from "./components/OrderConfirmation";
import { AnimatePresence, motion } from "framer-motion";
import { useWizard } from "./components/hooks/useWizard";
import { syncOrders } from "./components/utils/localDB";
import OrderForm from "./components/OrderForm";

const steps = [
  "Product Selection",
  "Customer Information",
  "Order Summary",
  "Order Confirmation",
];

const App: React.FC = () => {
  const { currentStep, nextStep, prevStep } = useWizard(steps.length);
  const [orderData, setOrderData] = useState<any>({});

  // Update the order data state with partial updates.
  const updateOrderData = (data: any) => {
    setOrderData((prev: any) => ({ ...prev, ...data }));
  };

  // Listen for connectivity changes to sync offline orders.
  useEffect(() => {
    const handleOnline = () => {
      syncOrders();
    };
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  // Framer Motion variants for dynamic step transitions.
  const stepVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  // Render the current step.
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ProductSelection
            orderData={orderData}
            updateOrderData={updateOrderData}
            nextStep={nextStep}
          />
        );
      case 1:
        return (
          <CustomerInformation
            orderData={orderData}
            updateOrderData={updateOrderData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 2:
        return (
          <OrderSummary
            orderData={orderData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return <OrderConfirmation orderData={orderData} />;
      default:
        return null;
    }
  };

  return (
    <Router>
      <ScrollToHash />
      <div className="min-h-screen flex flex-col justify-center relative">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <header id="home" className="relative">
                  <div
                    className="min-h-screen bg-cover bg-center bg-fixed"
                    style={{ backgroundImage: `url(${heroImage})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-stone-50/30 to-[var(--color-secondary)]/40 backdrop-blur-sm" />
                    <div className="relative z-10 text-[var(--color-primary)]">
                      <NavBar />
                      <Hero />
                    </div>
                  </div>
                </header>
                <main className="flex-1">
                  <section id="overview">
                    <Overview />
                  </section>
                  <section id="recipe">
                    <Recipe />
                  </section>
                  <section id="vision">
                    <Vision />
                  </section>
                  <section id="testimonial">
                    <Testimonial />
                  </section>
                  <section id="faq">
                    <FAQ />
                  </section>
                  <section id="contactnewsletter">
                    <ContactNewsletter />
                  </section>
                </main>
              </>
            }
          />
          <Route
            path="/order"
            element={
              <>
                <div className="min-h-screen bg-gray-50 font-custom">
                  <Header />
                  <main role="main" className="container mx-auto p-4">
                    <ProgressBar steps={steps} currentStep={currentStep} />
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        variants={stepVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                      >
                        {renderStep()}
                      </motion.div>
                    </AnimatePresence>
                  </main>
                </div>
              </>
            }
          />
          <Route
            path="/orderForm"
            element={
              <div className="">
                <NavBar />
                <OrderForm />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

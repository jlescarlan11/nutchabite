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
import OrderForm from "./components/OrderForm";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import LoginModal from "./components/LoginModal";
import Dashboard from "./components/Dashboard";

const App = () => {
  const methods = useForm();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userName, setUserName] = useState("");

  const handleLoginSuccess = (name: string) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  return (
    <Router>
      <FormProvider {...methods}>
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
                        <NavBar
                          onLoginClick={() => setShowLoginModal(true)}
                          onLoginSuccess={handleLoginSuccess}
                          isLoggedIn={isLoggedIn}
                          userName={userName}
                        />
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
            <Route path="/order" element={<OrderForm />} />
            <Route
              path="/dashboard"
              element={<Dashboard userName={userName} />}
            />
          </Routes>
        </div>

        {/* Render the Login Modal if needed */}
        {showLoginModal && (
          <LoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </FormProvider>
    </Router>
  );
};

export default App;

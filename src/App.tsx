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

const App = () => {
  const methods = useForm();
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
            <Route path="/order" element={<OrderForm />} />
          </Routes>
        </div>
      </FormProvider>
    </Router>
  );
};

export default App;

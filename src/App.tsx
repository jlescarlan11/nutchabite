// App.jsx
import { createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import heroImage from "./assets/HeroImage.webp";

// New cool feature!

export const MobileMenuContext = createContext({
  showMenu: false,
  setShowMenu: () => {},
});

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-center relative">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <header className="relative">
                  <div
                    className="min-h-screen bg-cover bg-center bg-fixed"
                    style={{ backgroundImage: `url(${heroImage})` }}
                  >
                    {/* Enhanced overlay with gradient, blur, and parallax effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-stone-50/30 to-[var(--color-secondary)]/40 backdrop-blur-sm" />
                    <div className="relative z-10 text-[var(--color-primary)]">
                      <Hero />
                    </div>
                  </div>
                </header>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

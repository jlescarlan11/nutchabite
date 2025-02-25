import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "../assets/heroImage.webp";

/* -------------------------------------------------------------------------- */
/*                             Style Configurations                           */
/* -------------------------------------------------------------------------- */

// Staggered entrance animations
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// Gradient overlay for better text visibility using our matcha palette
const gradientOverlayStyles = {
  background:
    "linear-gradient(135deg, rgba(16, 185, 129, 0.6), rgba(244, 63, 94, 0.6))",
  backgroundSize: "200% 200%",
  animation: "gradientAnimation 10s ease infinite",
};

// Parallax effect multiplier
const PARALLAX_MULTIPLIER = 0.3;

/* -------------------------------------------------------------------------- */
/*                          Subcomponent: HeroBackground                      */
/* -------------------------------------------------------------------------- */

interface HeroBackgroundProps {
  offsetY: number;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ offsetY }) => (
  <div className="absolute inset-0 overflow-hidden z-0" aria-hidden="true">
    {/* Background Image with Parallax Effect */}
    <motion.img
      src={heroImage}
      alt="Nutcha Bites - Crunchy Iloilo Bandi with Matcha"
      className="w-full h-full object-cover"
      style={{ transform: `translateY(${offsetY * PARALLAX_MULTIPLIER}px)` }}
    />
    {/* Gradient Overlay */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={gradientOverlayStyles}
    />
  </div>
);

/* -------------------------------------------------------------------------- */
/*                          Main Component: Hero                              */
/* -------------------------------------------------------------------------- */

export default function Hero() {
  const navigate = useNavigate();
  const [offsetY, setOffsetY] = useState(0);

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      role="banner"
      aria-labelledby="hero-heading"
      className="relative h-screen flex items-center justify-center text-center px-4 sm:px-6 md:px-8 overflow-hidden"
    >
      {/* Inject Keyframes for Animated Gradient */}
      <style>{`
        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Background */}
      <HeroBackground offsetY={offsetY} />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center px-4animate-fadeIn"
      >
        <motion.div
          variants={itemVariants}
          className="mt-28 text-center transition-all duration-500"
        >
          <h1
            id="hero-heading"
            className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-wider drop-shadow-lg text-emerald-500"
          >
            Nutcha Bites
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-light mt-4 drop-shadow-sm text-neutral-50">
            Old-School Crunch, New-School Vibes. A Nutchalicious Bite!
          </p>
          <motion.div
            variants={itemVariants}
            className="mt-8 px-6 py-3 hover:-translate-y-0.05 transition-all duration-300 ease-in-out hover:bg-rose-600 bg-rose-500 text-white rounded shadow-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
            }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            <button
              onClick={() => navigate("/order")}
              className=" font-semibold text-lg sm:text-xl "
            >
              Order Now
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </header>
  );
}

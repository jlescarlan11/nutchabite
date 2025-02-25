/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        overlayPulse: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.6" },
        },
      },
      fontFamily: {
        inter: ["Inter", "system-ui", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
      colors: {
        abulaka: "#eeeeee",
      },
      animation: {
        overlay: "overlayPulse 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

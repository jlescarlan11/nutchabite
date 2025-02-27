// src/components/Header.tsx
import React from "react";
import { FaLeaf } from "react-icons/fa"; // Using FaLeaf from Font Awesome

const Header: React.FC = () => {
  return (
    <header
      className="relative w-full h-80 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/assets/iloilo-pattern.jpg')" }} // Custom background texture
    >
      <div className="absolute inset-0 bg-green-800 opacity-70"></div>
      <div className="relative text-center text-white px-4">
        <div className="flex items-center justify-center mb-4">
          <FaLeaf className="text-5xl mr-2" aria-hidden="true" />
          <img
            src="/assets/nutcha-logo.png"
            alt="Nutcha Bites Logo"
            className="h-16"
          />
        </div>
        <h1 className="text-4xl font-bold">Nutcha Bites</h1>
        <p className="text-xl mt-2">A Fusion of Tradition & Modern Taste</p>
      </div>
    </header>
  );
};

export default Header;

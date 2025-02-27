// src/components/MobileNav.tsx
import React from "react";

interface MobileNavProps {
  isOpen: boolean;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <nav className="md:hidden bg-white shadow-md">
      <ul className="flex flex-col space-y-2 p-4">
        <li>
          <a
            href="/"
            className="block hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/products"
            className="block hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            Products
          </a>
        </li>
        <li>
          <a
            href="/about"
            className="block hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            About
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNav;

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="relative w-full">
      {/* Announcement Bar */}
      <div className="bg-green-600 text-white text-center py-2 text-sm">
        Limited Offer: Free shipping on orders over $50!
      </div>

      {/* Main Header */}
      <div className="bg-[url('/path-to-your-image.jpg')] bg-cover bg-center h-[500px] flex flex-col justify-between">
        <nav className="flex items-center justify-between px-6 py-4 md:px-12">
          {/* Logo and Tagline */}
          <div className="flex flex-col md:flex-row md:items-center">
            <img src="/logo.png" alt="Matcha Bandi Logo" className="h-12" />
            <span className="text-lg font-bold text-white md:ml-3">
              Crunch into Happiness!
            </span>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex space-x-6 text-white font-medium">
            <a href="#home" className="hover:text-green-300">
              Home
            </a>
            <a href="#products" className="hover:text-green-300">
              Products
            </a>
            <a href="#about" className="hover:text-green-300">
              About
            </a>
            <a href="#recipes" className="hover:text-green-300">
              Recipes
            </a>
            <a href="#contact" className="hover:text-green-300">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white"
          >
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-green-800 text-white py-4 flex flex-col items-center space-y-4 md:hidden">
            <a href="#home" className="hover:text-green-300">
              Home
            </a>
            <a href="#products" className="hover:text-green-300">
              Products
            </a>
            <a href="#about" className="hover:text-green-300">
              About
            </a>
            <a href="#recipes" className="hover:text-green-300">
              Recipes
            </a>
            <a href="#contact" className="hover:text-green-300">
              Contact
            </a>
          </div>
        )}

        {/* Call to Action */}
        <div className="flex flex-col items-center text-center text-white mt-auto pb-12">
          <h1 className="text-4xl md:text-6xl font-bold">
            Discover Your New Favorite Snack!
          </h1>
          <Button className="mt-6 bg-yellow-400 text-black px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-500">
            Shop Now
          </Button>
        </div>
      </div>
    </header>
  );
}

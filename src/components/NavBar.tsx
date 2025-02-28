// NavBar.tsx
import { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { HashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import { StoreIcon } from "lucide-react";
import Overview from "./Overview";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  // State for mobile menu and search input visibility
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Local state to manage login modal visibility
  const [showLoginModal, setShowLoginModal] = useState(false);

  const navigate = useNavigate();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  // Opens the login modal
  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  // Callback for successful login from the LoginModal

  const MenuItems = [
    { id: "home", name: "Home" },
    { id: "overview", name: "Overview" },
    { id: "recipe", name: "Recipe" },
    { id: "vision", name: "Vision" },
    { id: "testimonial", name: "Testimonial" },
    { id: "faq", name: "FAQ" },
    { id: "contactnewsletter", name: "Connect with Us" },
  ];

  return (
    <>
      <nav
        className="
          fixed w-full z-50 shadow-sm
          bg-[var(--color-primary)]
          border-b border-[var(--color-secondary-20)]
        "
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="w-full px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="/"
                className="
                  font-heading text-2xl font-bold
                  text-[var(--color-tertiary)]
                  transition-transform duration-300 ease-in-out
                  hover:scale-105
                "
                aria-label="Matcha Bandi Home"
              >
                Nutcha Bites
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="flex items-center">
              <ul className="hidden md:flex md:items-center space-x-6 ml-6">
                {MenuItems.map((item) => (
                  <li key={item.id}>
                    <HashLink
                      smooth
                      to={`/#${item.id}`}
                      className="
         font-body text-sm font-medium
                      text-[var(--color-secondary-80)]
                      transition-colors duration-300 ease-in-out
                      hover:text-[var(--color-tertiary-70)]
        "
                      aria-label={item.name}
                    >
                      {item.name}
                    </HashLink>
                  </li>
                ))}

                {/* ...other links... */}
              </ul>
            </div>

            {/* Right Side: Icons and Mobile Menu Button */}
            <div className="flex items-center">
              <div className="flex items-center space-x-4">
                {/* Store Icon */}
                <button
                  className="
                    relative
                    text-[var(--color-tertiary-80)]
                    transition-colors duration-300 ease-in-out
                    hover:text-[var(--color-tertiary)]
                    focus:outline-none
                  "
                  aria-label="Order Form"
                  onClick={() => navigate("/orderForm")}
                >
                  <StoreIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex items-center md:hidden ml-4">
                <button
                  onClick={toggleMobileMenu}
                  className="
                    text-[var(--color-tertiary-80)]
                    transition-colors duration-300 ease-in-out
                    hover:text-[var(--color-tertiary)]
                    focus:outline-none
                  "
                  aria-label="Toggle mobile menu"
                  aria-expanded={mobileMenuOpen ? "true" : "false"}
                >
                  {mobileMenuOpen ? (
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`
            md:hidden overflow-hidden
            transition-all duration-300 ease-in-out
            ${
              mobileMenuOpen
                ? "opacity-100 translate-y-0 max-h-screen"
                : "opacity-0 -translate-y-4 max-h-0"
            }
          `}
          role="menu"
          aria-label="Mobile Navigation"
        >
          <ul className="px-4 pt-2 pb-3 space-y-2">
            {MenuItems.map((item) => (
              <li key={item.id}>
                <HashLink
                  smooth
                  to={`/#${item.id}`}
                  className="
          font-body text-sm font-medium
          text-[var(--color-secondary-80)]
          transition-colors duration-300 ease-in-out
          hover:text-[var(--color-tertiary-70)]
        "
                  aria-label={item.name}
                >
                  {item.name}
                </HashLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;

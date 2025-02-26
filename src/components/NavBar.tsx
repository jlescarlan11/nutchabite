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

const NavBar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const navigate = useNavigate();

  return (
    <nav
      className="
        fixed w-full z-50 shadow-sm
        bg-[var(--color-primary)]
        border-b border-[var(--color-secondary-20)]
      "
      role="navigation"
      aria-label="Main Navigation"
    >
      {/* Full width container with horizontal padding */}
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
              Matcha Bandi
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center">
            <ul className="hidden md:flex md:items-center space-x-6 ml-6">
              <li>
                <HashLink
                  smooth
                  to="/#home"
                  className="
                    font-body text-sm font-medium
                    text-[var(--color-secondary-80)]
                    transition-colors duration-300 ease-in-out
                    hover:text-[var(--color-tertiary-70)]
                  "
                  aria-label="Home"
                >
                  Home
                </HashLink>
              </li>
              <li>
                <HashLink
                  smooth
                  to="/#overview"
                  className="
                    font-body text-sm font-medium
                    text-[var(--color-secondary-80)]
                    transition-colors duration-300 ease-in-out
                    hover:text-[var(--color-tertiary-70)]
                  "
                  aria-label="Overview"
                >
                  Overview
                </HashLink>
              </li>
              <li>
                <HashLink
                  smooth
                  to="/#recipe"
                  className="
                    font-body text-sm font-medium
                    text-[var(--color-secondary-80)]
                    transition-colors duration-300 ease-in-out
                    hover:text-[var(--color-tertiary-70)]
                  "
                  aria-label="Recipe"
                >
                  Recipe
                </HashLink>
              </li>
              <li>
                <HashLink
                  smooth
                  to="/#vision"
                  className="
                    font-body text-sm font-medium
                    text-[var(--color-secondary-80)]
                    transition-colors duration-300 ease-in-out
                    hover:text-[var(--color-tertiary-70)]
                  "
                  aria-label="Vision"
                >
                  Vision
                </HashLink>
              </li>
              <li>
                <HashLink
                  smooth
                  to="/#testimonial"
                  className="
                    font-body text-sm font-medium
                    text-[var(--color-secondary-80)]
                    transition-colors duration-300 ease-in-out
                    hover:text-[var(--color-tertiary-70)]
                  "
                  aria-label="Testimonial"
                >
                  Testimonial
                </HashLink>
              </li>
              <li>
                <HashLink
                  smooth
                  to="/#faq"
                  className="
                    font-body text-sm font-medium
                    text-[var(--color-secondary-80)]
                    transition-colors duration-300 ease-in-out
                    hover:text-[var(--color-tertiary-70)]
                  "
                  aria-label="Frequently Asked Question"
                >
                  FAQs
                </HashLink>
              </li>
              <li>
                <HashLink
                  smooth
                  to="/#contactnewsletter"
                  className="
                    font-body text-sm font-medium
                    text-[var(--color-secondary-80)]
                    transition-colors duration-300 ease-in-out
                    hover:text-[var(--color-tertiary-70)]
                  "
                  aria-label="Contact Us / Newsletter Signup"
                >
                  Connect with Us
                </HashLink>
              </li>
            </ul>
          </div>

          {/* Right Side: Icons and Mobile Menu Button */}
          <div className="flex items-center">
            <div className="flex items-center space-x-4">
              {/* Search Icon */}
              <div className="relative">
                <button
                  onClick={toggleSearch}
                  className="
                    text-[var(--color-tertiary-80)]
                    transition-colors duration-300 ease-in-out
                    hover:text-[var(--color-tertiary)]
                    focus:outline-none
                  "
                  aria-label="Toggle search"
                  aria-expanded={searchOpen ? "true" : "false"}
                >
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                {searchOpen && (
                  <input
                    type="text"
                    placeholder="Search..."
                    className="
                      font-body absolute right-0 mt-2 w-48 px-3 py-2
                      border border-[var(--color-secondary-30)]
                      rounded-md focus:outline-none
                      focus:border-[var(--color-tertiary-60)]
                      transition-all duration-300 ease-in-out
                      bg-[var(--color-primary)]
                      text-[var(--color-secondary-80)]
                    "
                    aria-label="Search input"
                  />
                )}
              </div>

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
                onClick={() => navigate("/order")}
              >
                <StoreIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* User Icon */}
              <button
                className="
                  text-[var(--color-tertiary-80)]
                  transition-colors duration-300 ease-in-out
                  hover:text-[var(--color-tertiary)]
                  focus:outline-none
                "
                aria-label="User account"
              >
                <UserIcon className="h-6 w-6" aria-hidden="true" />
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
          <li>
            <HashLink
              smooth
              to="/#home"
              className="
                font-body text-sm font-medium
                text-[var(--color-secondary-80)]
                transition-colors duration-300 ease-in-out
                hover:text-[var(--color-tertiary-70)]
              "
              aria-label="Home"
            >
              Home
            </HashLink>
          </li>
          <li>
            <HashLink
              smooth
              to="/#overview"
              className="
                font-body text-sm font-medium
                text-[var(--color-secondary-80)]
                transition-colors duration-300 ease-in-out
                hover:text-[var(--color-tertiary-70)]
              "
              aria-label="Overview"
            >
              Overview
            </HashLink>
          </li>
          <li>
            <HashLink
              smooth
              to="/#recipe"
              className="
                font-body text-sm font-medium
                text-[var(--color-secondary-80)]
                transition-colors duration-300 ease-in-out
                hover:text-[var(--color-tertiary-70)]
              "
              aria-label="Recipe"
            >
              Recipe
            </HashLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

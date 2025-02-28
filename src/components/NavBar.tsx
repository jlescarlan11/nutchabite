// NavBar.tsx
import React, { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { StoreIcon } from "lucide-react";
import { HashLink } from "react-router-hash-link";
import ErrorBoundary from "./ErrorBoundary";
import useAnalytics from "./hooks/useAnalytics";
import useABTesting from "./hooks/useABTesting";
import heroLogo from "../assets/heroImage.webp";

// Lazy-load the MobileMenu component
const MobileMenu = lazy(() => import("./MobileMenu"));

// Localization & labels
const translations = {
  skipToContent: "Skip to content",
  home: "Home",
  overview: "Overview",
  recipe: "Recipe",
  vision: "Vision",
  testimonial: "Testimonial",
  connect: "Connect with Us",
  orderNow: "Order Now",
  search: "Search",
  login: "Login",
};

export interface NavItem {
  id: string;
  label: string;
  path: string;
  cta?: boolean;
}

// Menu configuration
const navItems: NavItem[] = [
  { id: "home", label: translations.home, path: "/" },
  { id: "overview", label: translations.overview, path: "/#overview" },
  { id: "recipe", label: translations.recipe, path: "/#recipe" },
  { id: "vision", label: translations.vision, path: "/#vision" },
  { id: "testimonial", label: translations.testimonial, path: "/#testimonial" },
  { id: "connect", label: translations.connect, path: "/#contact" },
];

const NavBar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { trackEvent } = useAnalytics();
  const { variant } = useABTesting("orderNowCTA");

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  const handleCTAClick = () => {
    trackEvent("order_now_click", { variant });
  };

  // Change CTA button appearance based on A/B testing variant
  const ctaClasses =
    variant === "A"
      ? "ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:bg-red-700"
      : "ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-700";

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="skip-link absolute top-0 left-0 p-2 bg-white text-blue-600 focus:translate-y-0 -translate-y-full transition-transform duration-300"
      >
        {translations.skipToContent}
      </a>

      <nav
        role="navigation"
        aria-label="Main Navigation"
        className="fixed w-full z-50 bg-[var(--color-primary)] shadow-sm border-b border-[var(--color-secondary-20)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Branding */}
            <div className="flex-shrink-0">
              <Link to="/" aria-label="Nutcha Bites Home">
                <img
                  className="h-8 w-auto transition-transform duration-300 hover:scale-105"
                  src={heroLogo}
                  alt="Nutcha Bites logo combining a matcha leaf with traditional design elements"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <ul role="menubar" className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <li key={item.id} role="none">
                  {item.cta ? (
                    <Link
                      to={item.path}
                      role="menuitem"
                      tabIndex={0}
                      onClick={handleCTAClick}
                      className={`${ctaClasses} transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <HashLink
                      smooth
                      to={item.path}
                      role="menuitem"
                      tabIndex={0}
                      className="text-gray-700 hover:text-gray-900 focus:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {item.label}
                    </HashLink>
                  )}
                </li>
              ))}
            </ul>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSearch}
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
                aria-label={translations.search}
              >
                <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <Link
                to="/order"
                onClick={handleCTAClick}
                className={`${ctaClasses} hidden md:inline-flex`}
              >
                {translations.orderNow}
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="md:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu (lazy-loaded with a transition) */}
        <ErrorBoundary
          fallback={
            <div role="alert" className="p-4 text-center">
              Failed to load mobile menu. Please try again later.
            </div>
          }
        >
          <Suspense
            fallback={
              <div className="md:hidden p-4" role="status" aria-live="polite">
                Loading mobile navigation...
              </div>
            }
          >
            <Transition
              as="div"
              show={isMobileMenuOpen}
              enter="transition duration-200 ease-out"
              enterFrom="opacity-0 transform -translate-y-2"
              enterTo="opacity-100 transform translate-y-0"
              leave="transition duration-150 ease-in"
              leaveFrom="opacity-100 transform translate-y-0"
              leaveTo="opacity-0 transform -translate-y-2"
            >
              <MobileMenu
                navItems={navItems}
                onLinkClick={() => setIsMobileMenuOpen(false)}
                onCTAClick={handleCTAClick}
              />
            </Transition>
          </Suspense>
        </ErrorBoundary>
      </nav>

      {/* Main content container */}
      <main id="main-content">{/* Your page content goes here */}</main>

      {/* Optional Search Input */}
      {isSearchOpen && (
        <div className="fixed top-16 inset-x-0 p-4 bg-white shadow-md z-40">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      )}

      {/* Optional Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            {/* Your login form elements here */}
            <button
              onClick={closeLoginModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;

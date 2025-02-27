// src/components/NavBar.tsx
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
import LoginModal from "./LoginModal";
import { useSectionContext, SectionInfo } from "./context/SectionContext";

interface NavBarProps {
  onLoginClick: () => void;
  onLoginSuccess: (name: string) => void;
  isLoggedIn: boolean;
  userName: string;
}

const NavBar: React.FC<NavBarProps> = ({
  onLoginClick,
  onLoginSuccess,
  isLoggedIn,
  userName,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const { sections } = useSectionContext();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    setSearchQuery("");
  };

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  const handleLoginSuccess = (name: string) => {
    onLoginSuccess(name);
    closeLoginModal();
  };

  // Filter sections by matching search query with title or full text (all lower-cased)
  const filteredSections: SectionInfo[] = searchQuery
    ? sections.filter((section) => {
        const query = searchQuery.toLowerCase();
        return (
          section.title.toLowerCase().includes(query) ||
          section.text.toLowerCase().includes(query)
        );
      })
    : [];

  return (
    <>
      <nav
        className="fixed w-full z-50 shadow-sm bg-[var(--color-primary)] border-b border-[var(--color-secondary-20)]"
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="w-full px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="/"
                className="font-heading text-2xl font-bold text-[var(--color-tertiary)] transition-transform duration-300 ease-in-out hover:scale-105"
                aria-label="Nutcha Bites Home"
              >
                Nutcha Bites
              </a>
            </div>

            {/* Desktop Navigation: List section titles */}
            <div className="hidden md:flex md:items-center space-x-6 ml-6">
              {sections.map((section) => (
                <li key={section.id}>
                  <HashLink
                    smooth
                    to={`/#${section.id}`}
                    className="font-body text-sm font-medium text-[var(--color-secondary-80)] transition-colors duration-300 ease-in-out hover:text-[var(--color-tertiary-70)]"
                    aria-label={section.title}
                  >
                    {section.title}
                  </HashLink>
                </li>
              ))}
            </div>

            {/* Right Side: Search, Order, User and Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Search Icon & Input */}
              <div className="relative">
                <button
                  onClick={toggleSearch}
                  className="text-[var(--color-tertiary-80)] transition-colors duration-300 ease-in-out hover:text-[var(--color-tertiary)] focus:outline-none"
                  aria-label="Toggle search"
                  aria-expanded={searchOpen ? "true" : "false"}
                >
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                {searchOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 border-b border-gray-200 focus:outline-none"
                      aria-label="Search input"
                    />
                    {filteredSections.length > 0 && (
                      <ul className="max-h-60 overflow-y-auto">
                        {filteredSections.map((section) => (
                          <li key={section.id} className="hover:bg-gray-100">
                            <HashLink
                              smooth
                              to={`/#${section.id}`}
                              onClick={() => {
                                setSearchQuery("");
                                setSearchOpen(false);
                              }}
                              className="block px-4 py-2 text-gray-700"
                            >
                              {section.title}
                            </HashLink>
                          </li>
                        ))}
                      </ul>
                    )}
                    {searchQuery && filteredSections.length === 0 && (
                      <div className="px-4 py-2 text-gray-500">
                        No results found.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Order Icon */}
              <button
                className="relative text-[var(--color-tertiary-80)] transition-colors duration-300 ease-in-out hover:text-[var(--color-tertiary)] focus:outline-none"
                aria-label="Order Form"
                onClick={() => navigate("/order")}
              >
                <StoreIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* User Account / Login */}
              {isLoggedIn ? (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center focus:outline-none"
                  aria-label="User Dashboard"
                >
                  <img
                    src="/path/to/avatar.jpg"
                    alt="User Avatar"
                    className="h-6 w-6 rounded-full"
                  />
                  <span className="ml-2 text-[var(--color-tertiary-80)]">
                    {userName}
                  </span>
                </button>
              ) : (
                <button
                  onClick={openLoginModal}
                  className="text-[var(--color-tertiary-80)] transition-colors duration-300 ease-in-out hover:text-[var(--color-tertiary)] focus:outline-none"
                  aria-label="Login / Signup"
                >
                  <UserIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              )}

              {/* Mobile Menu Button */}
              <div className="flex items-center md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="text-[var(--color-tertiary-80)] transition-colors duration-300 ease-in-out hover:text-[var(--color-tertiary)] focus:outline-none"
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
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? "opacity-100 translate-y-0 max-h-screen"
              : "opacity-0 -translate-y-4 max-h-0"
          }`}
          role="menu"
          aria-label="Mobile Navigation"
        >
          <ul className="px-4 pt-2 pb-3 space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <HashLink
                  smooth
                  to={`/#${section.id}`}
                  className="font-body text-sm font-medium text-[var(--color-secondary-80)] transition-colors duration-300 ease-in-out hover:text-[var(--color-tertiary-70)]"
                  aria-label={section.title}
                >
                  {section.title}
                </HashLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Render the Login Modal if needed */}
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={closeLoginModal}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

export default NavBar;

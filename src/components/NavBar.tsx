// import { useState } from "react";
// import {
//   Bars3Icon,
//   XMarkIcon,
//   MagnifyingGlassIcon,
//   ShoppingCartIcon,
//   UserIcon,
// } from "@heroicons/react/24/outline";

// const NavBar: React.FC = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);

//   const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
//   const toggleProductsDropdown = () =>
//     setProductsDropdownOpen(!productsDropdownOpen);
//   const toggleSearch = () => setSearchOpen(!searchOpen);

//   return (
//     <nav
//       className="bg-green-50 border-b border-gray-200 fixed w-full z-50 shadow-sm"
//       role="navigation"
//       aria-label="Main Navigation"
//     >
//       <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <a
//               href="/"
//               className="font-heading text-2xl font-bold text-green-500 transition-transform duration-300 ease-in-out hover:scale-105"
//               aria-label="Matcha Bandi Home"
//             >
//               Matcha Bandi
//             </a>
//           </div>

//           {/* Desktop Navigation */}
//           <ul className="hidden md:flex md:items-center space-x-6">
//             <li>
//               <a
//                 href="/"
//                 className="font-body text-sm font-medium text-gray-700 transition-colors duration-300 ease-in-out hover:text-green-700"
//                 aria-label="Home"
//               >
//                 Home
//               </a>
//             </li>
//             <li className="relative">
//               <button
//                 onClick={toggleProductsDropdown}
//                 className="font-body text-sm font-medium text-gray-700 transition-colors duration-300 ease-in-out hover:text-green-700 inline-flex items-center focus:outline-none"
//                 aria-haspopup="true"
//                 aria-expanded={productsDropdownOpen ? "true" : "false"}
//                 aria-label="Products Menu"
//               >
//                 Products
//                 <svg
//                   className="ml-1 h-6 w-6 transition-transform duration-300 ease-in-out transform"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   role="img"
//                   aria-hidden="true"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 9l-7 7-7-7"
//                   />
//                 </svg>
//               </button>
//               {productsDropdownOpen && (
//                 <ul
//                   className="absolute mt-2 w-40 rounded-md bg-white border border-gray-100 transition-all duration-300 ease-in-out"
//                   role="menu"
//                   aria-label="Products Dropdown"
//                 >
//                   <li>
//                     <a
//                       href="/products/chips"
//                       className="font-body block px-4 py-2 text-sm text-gray-700 transition-colors duration-300 ease-in-out hover:bg-green-50 hover:text-green-700"
//                       role="menuitem"
//                       aria-label="Chips"
//                     >
//                       Chips
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="/products/nuts"
//                       className="font-body block px-4 py-2 text-sm text-gray-700 transition-colors duration-300 ease-in-out hover:bg-green-50 hover:text-green-700"
//                       role="menuitem"
//                       aria-label="Nuts"
//                     >
//                       Nuts
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="/products/cookies"
//                       className="font-body block px-4 py-2 text-sm text-gray-700 transition-colors duration-300 ease-in-out hover:bg-green-50 hover:text-green-700"
//                       role="menuitem"
//                       aria-label="Cookies"
//                     >
//                       Cookies
//                     </a>
//                   </li>
//                 </ul>
//               )}
//             </li>
//             <li>
//               <a
//                 href="/recipes"
//                 className="font-body text-sm font-medium text-gray-700 transition-colors duration-300 ease-in-out hover:text-green-700"
//                 aria-label="Recipes"
//               >
//                 Recipes
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/deals"
//                 className="font-body text-sm font-medium text-gray-700 transition-colors duration-300 ease-in-out hover:text-green-700"
//                 aria-label="Deals"
//               >
//                 Deals
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/about"
//                 className="font-body text-sm font-medium text-gray-700 transition-colors duration-300 ease-in-out hover:text-green-700"
//                 aria-label="About"
//               >
//                 About
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/contact"
//                 className="font-body text-sm font-medium text-gray-700 transition-colors duration-300 ease-in-out hover:text-green-700"
//                 aria-label="Contact"
//               >
//                 Contact
//               </a>
//             </li>
//           </ul>

//           {/* Right Side Icons */}
//           <div className="flex items-center space-x-4">
//             {/* Search Icon */}
//             <div className="relative">
//               <button
//                 onClick={toggleSearch}
//                 className="text-green-700 transition-colors duration-300 ease-in-out hover:text-green-500 focus:outline-none"
//                 aria-label="Toggle search"
//                 aria-expanded={searchOpen ? "true" : "false"}
//               >
//                 <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
//               </button>
//               {searchOpen && (
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="font-body absolute right-0 mt-2 w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 transition-all duration-300 ease-in-out"
//                   aria-label="Search input"
//                 />
//               )}
//             </div>

//             {/* Cart Icon */}
//             <button
//               className="relative text-green-700 transition-colors duration-300 ease-in-out hover:text-green-500 focus:outline-none"
//               aria-label="View cart"
//             >
//               <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
//               <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-white bg-green-500 rounded-full transition-all duration-300 ease-in-out">
//                 3
//               </span>
//             </button>

//             {/* User Icon */}
//             <button
//               className="text-green-700 transition-colors duration-300 ease-in-out hover:text-green-500 focus:outline-none"
//               aria-label="User account"
//             >
//               <UserIcon className="h-6 w-6" aria-hidden="true" />
//             </button>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="flex items-center md:hidden">
//             <button
//               onClick={toggleMobileMenu}
//               className="text-green-700 transition-colors duration-300 ease-in-out hover:text-green-500 focus:outline-none"
//               aria-label="Toggle mobile menu"
//               aria-expanded={mobileMenuOpen ? "true" : "false"}
//             >
//               {mobileMenuOpen ? (
//                 <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//               ) : (
//                 <Bars3Icon className="h-6 w-6" aria-hidden="true" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       <div
//         className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
//           mobileMenuOpen
//             ? "opacity-100 translate-y-0 max-h-screen"
//             : "opacity-0 -translate-y-4 max-h-0"
//         }`}
//         role="menu"
//         aria-label="Mobile Navigation"
//       >
//         <ul className="px-4 pt-2 pb-3 space-y-2">
//           <li>
//             <a
//               href="/"
//               className="font-body block text-base font-medium text-gray-700 transition-colors duration-300 ease-in-out hover:text-green-700"
//               role="menuitem"
//               aria-label="Home"
//             >
//               Home
//             </a>
//           </li>
//           <li className="relative">
//             <button
//               onClick={toggleProductsDropdown}
//               className="font-body w-full text-left  text-base font-medium text-gray-700 transition-colors duration-300 ease-in-out hover:text-green-700 inline-flex items-center focus:outline-none"
//               aria-haspopup="true"
//               aria-expanded={productsDropdownOpen ? "true" : "false"}
//               aria-label="Toggle Products dropdown"
//             >
//               Products
//               <svg
//                 className="ml-1 h-6 w-6 transition-transform duration-300 ease-in-out transform"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 role="img"
//                 aria-hidden="true"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>
//             {productsDropdownOpen && (
//               <ul
//                 className="ml-4 transition-all duration-300 ease-in-out"
//                 role="menu"
//                 aria-label="Products Dropdown"
//               >
//                 <li>
//                   <a
//                     href="/products/chips"
//                     className="font-body block text-base font-medium text-gray-700 transition-colors duration-300 ease-in-out hover:text-green-700"
//                     role="menuitem"
//                     aria-label="Chips"
//                   >
//                     Chips
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="/products/nuts"
//                     className="font-body block text-base font-medium text-gray-700 transition-colors duration-300 ease-in-out hover:text-green-700"
//                     role="menuitem"
//                     aria-label="Nuts"
//                   >
//                     Nuts
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="/products/cookies"
//                     className="font-body block text-base font-medium text-gray-700 transition-colors duration-300 ease-in-out hover:text-green-700"
//                     role="menuitem"
//                     aria-label="Cookies"
//                   >
//                     Cookies
//                   </a>
//                 </li>
//               </ul>
//             )}
//           </li>
//           <li>
//             <a
//               href="/recipes"
//               className="font-body block text-base font-medium text-gray-700 transition-colors duration-300 ease-in-out hover:text-green-700"
//               role="menuitem"
//               aria-label="Recipes"
//             >
//               Recipes
//             </a>
//           </li>
//           <li>
//             <a
//               href="/deals"
//               className="font-body block text-base font-medium text-gray-700 transition-colors duration-300 ease-in-out hover:text-green-700"
//               role="menuitem"
//               aria-label="Deals"
//             >
//               Deals
//             </a>
//           </li>
//           <li>
//             <a
//               href="/about"
//               className="font-body block text-base font-medium text-gray-700 transition-colors duration-300 ease-in-out hover:text-green-700"
//               role="menuitem"
//               aria-label="About"
//             >
//               About
//             </a>
//           </li>
//           <li>
//             <a
//               href="/contact"
//               className="font-body block text-base font-medium text-gray-700 transition-colors duration-300 ease-in-out hover:text-green-700"
//               role="menuitem"
//               aria-label="Contact"
//             >
//               Contact
//             </a>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;

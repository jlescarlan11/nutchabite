import { useState, useEffect } from "react";

const Order = () => {
  const [quantity, setQuantity] = useState(1);
  const [showGiftNote, setShowGiftNote] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const price = 9.99;

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const toggleGiftNote = () => setShowGiftNote(!showGiftNote);
  const handleAddToCart = () => {
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 2000);
  };

  // Parallax effect for the hero image
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-sans bg-neutral-50 min-h-screen text-gray-800">
      <div className="max-w-4xl mx-auto p-4">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src="https://via.placeholder.com/800x400?text=Nutcha+Bites"
            alt="Nutcha Bites"
            className="w-full h-64 object-cover"
            style={{ transform: `translateY(${offsetY * 0.2}px)` }}
          />
          <div className="absolute inset-0 gradient-overlay"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white animate-fadeInUp">
              Nutcha Bites
            </h1>
            <p className="mt-2 text-lg md:text-xl text-white animate-fadeInUp animation-delay-200">
              A fusion of Iloilo’s artisanal bandi and the vibrant essence of
              matcha.
            </p>
          </div>
        </div>

        {/* Product Title & Description */}
        <div className="mt-6">
          <h2 className="text-3xl font-bold">Nutcha Bites</h2>
          <p className="mt-2 text-lg text-gray-700">
            Experience the fusion of Iloilo’s artisanal bandi with the healthful
            essence of matcha in every bite.
          </p>
        </div>

        {/* Order Form */}
        <div className="mt-8 space-y-6">
          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDecrease}
              aria-label="Decrease quantity"
              className="bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300 transform transition-transform duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              –
            </button>
            <span className="text-lg" aria-live="polite">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              aria-label="Increase quantity"
              className="bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300 transform transition-transform duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              +
            </button>
            <span className="text-lg font-semibold transition-all duration-200 ease-in-out">
              Total: ${(quantity * price).toFixed(2)}
            </span>
          </div>

          {/* Customization Options */}
          <div>
            <label className="block mb-2 font-medium">Package Size:</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-green-500"
                checked={showGiftNote}
                onChange={toggleGiftNote}
              />
              <span className="ml-2">Include a Gift Note</span>
            </label>
            {showGiftNote && (
              <textarea
                className="mt-2 w-full p-2 border border-gray-300 rounded"
                placeholder="Your gift message"
              ></textarea>
            )}
          </div>

          {/* Order Now Button */}
          <button
            onClick={handleAddToCart}
            aria-label="Place order now"
            className="w-full py-3 px-6 rounded-lg text-white font-bold bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Order Now
          </button>
          {showConfirmation && (
            <div className="text-green-600 text-center animate-bounce">
              Added to Cart!
            </div>
          )}
        </div>

        {/* Tabbed Navigation */}
        <div className="mt-10">
          <div className="border-b relative" role="tablist">
            <nav className="flex space-x-8">
              <button
                id="tab-details"
                role="tab"
                aria-selected={activeTab === "details"}
                aria-controls="tabpanel-details"
                onClick={() => setActiveTab("details")}
                className={`relative pb-4 px-1 font-medium text-sm focus:outline-none ${
                  activeTab === "details"
                    ? "text-green-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Product Details
                {activeTab === "details" && (
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-red-500 transition-all duration-300" />
                )}
              </button>
              <button
                id="tab-how"
                role="tab"
                aria-selected={activeTab === "how"}
                aria-controls="tabpanel-how"
                onClick={() => setActiveTab("how")}
                className={`relative pb-4 px-1 font-medium text-sm focus:outline-none ${
                  activeTab === "how"
                    ? "text-green-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                How It’s Made
                {activeTab === "how" && (
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-red-500 transition-all duration-300" />
                )}
              </button>
              <button
                id="tab-reviews"
                role="tab"
                aria-selected={activeTab === "reviews"}
                aria-controls="tabpanel-reviews"
                onClick={() => setActiveTab("reviews")}
                className={`relative pb-4 px-1 font-medium text-sm focus:outline-none ${
                  activeTab === "reviews"
                    ? "text-green-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Customer Reviews
                {activeTab === "reviews" && (
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-red-500 transition-all duration-300" />
                )}
              </button>
            </nav>
          </div>
          <div className="mt-4">
            {activeTab === "details" && (
              <div
                role="tabpanel"
                id="tabpanel-details"
                aria-labelledby="tab-details"
                className="transition-opacity duration-300 ease-in-out opacity-100"
              >
                <p className="text-lg">
                  Nutcha Bites are crafted by fusing the finest matcha with
                  traditional Iloilo bandi, delivering a unique taste experience
                  that is both nutritious and delicious.
                </p>
              </div>
            )}
            {activeTab === "how" && (
              <div
                role="tabpanel"
                id="tabpanel-how"
                aria-labelledby="tab-how"
                className="transition-opacity duration-300 ease-in-out opacity-100"
              >
                <p className="text-lg">
                  Our production process honors traditional methods while
                  incorporating modern techniques to ensure each bite is packed
                  with authentic flavors and high-quality ingredients.
                </p>
              </div>
            )}
            {activeTab === "reviews" && (
              <div
                role="tabpanel"
                id="tabpanel-reviews"
                aria-labelledby="tab-reviews"
                className="transition-opacity duration-300 ease-in-out opacity-100"
              >
                <p className="text-lg">
                  No reviews yet. Be the first to share your experience!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Summary Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex items-center justify-between shadow-lg transform transition-transform duration-300 animate-slideInUp md:hidden">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-gray-800">
            {quantity} Items
          </span>
          <span className="text-lg font-bold text-gray-900">
            ${(quantity * price).toFixed(2)}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          aria-label="Place order now"
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-4 rounded-lg shadow-md transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Order Now
        </button>
      </div>

      {/* Custom CSS for Animations & Gradient Overlay */}
      <style>{`
        .gradient-overlay {
          background: linear-gradient(
            45deg,
            #38a169,
            /* Approximation for matcha green (green-500) */ #10b981,
            /* Approximation for emerald-500 */ #38a169
          );
          background-size: 300% 300%;
          animation: gradientAnimation 15s ease infinite;
          opacity: 0.7;
        }
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        @keyframes slideInUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slideInUp {
          animation: slideInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Order;

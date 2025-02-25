import React, { useState } from "react";
import overviewImage from "../assets/OverviewImage.webp";

interface CheckIconProps {
  className?: string;
}

const CheckIcon: React.FC<CheckIconProps> = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <li role="listitem" className="flex items-start">
      <div className="flex-shrink-0 bg-emerald-100 text-emerald-500 rounded-full p-2 mr-3">
        <CheckIcon />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-neutral-800">{title}</h3>
        <p className="text-sm text-neutral-600">{description}</p>
      </div>
    </li>
  );
};

const Overview: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCTAClick = () => {
    document
      .getElementById("our-story")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="bg-neutral-50 text-neutral-800 py-12 sm:py-16 lg:py-20 font-sans"
      aria-labelledby="overview-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Right Column: High-Quality Product Image with Fade-In Animation */}
          <div className="w-full lg:w-1/2 ">
            <img
              src={overviewImage} // Replace with your actual product image URL
              alt="High-quality Nutcha Bites showcasing the artisanal fusion of vibrant matcha and traditional Iloilo bandi, presented with matcha powder accents and rustic cultural details."
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-auto rounded-lg shadow-lg transition-opacity duration-1000 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
          {/* Left Column: Text Content */}
          <div className="w-full lg:w-1/2 mt-10 lg:mt-0 lg:ml-10">
            <header className="mb-8">
              <h1
                id="overview-heading"
                className="text-3xl sm:text-4xl font-bold text-emerald-500 mb-4 tracking-tight"
              >
                Experience the Fusion: Matcha Magic Meets Iloilo Tradition
              </h1>
              <p className="text-lg sm:text-xl text-neutral-600 mb-6 leading-relaxed">
                Nutcha Bites blends the vibrant, earthy taste of premium matcha
                with the beloved, time-honored flavor of Iloilo’s bandi
                delicacy.
              </p>
            </header>
            <p className="mb-8 text-base sm:text-lg text-neutral-700 leading-relaxed">
              Nutcha Bites is more than just a snack—it’s a journey that marries
              the bold traditions of Iloilo with the modern allure of Japanese
              matcha. Each bite tells a story of artisanal craftsmanship,
              cultural celebration, and innovative flavor pairing designed to
              delight adventurous palates.
            </p>

            {/* Key Features as a semantic list */}
            <ul
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8"
              role="list"
            >
              <FeatureCard
                title="Handcrafted Excellence"
                description="Made with care using authentic, high-quality ingredients."
              />
              <FeatureCard
                title="Cultural Fusion"
                description="A unique blend that honors both tradition and innovation."
              />
              <FeatureCard
                title="Bold & Balanced Flavors"
                description="Experience the refreshing vibrancy of matcha perfectly complemented by the rich taste of bandi."
              />
              <FeatureCard
                title="Health & Indulgence"
                description="A snack that’s both satisfying and a nod to mindful indulgence."
              />
            </ul>

            {/* Call-to-Action as a semantic button */}
            <button
              type="button"
              aria-label="Discover the story behind Nutcha Bites"
              onClick={handleCTAClick}
              className="bg-rose-500 text-white px-6 py-3 rounded-md text-lg font-medium 
                         hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-opacity-50 
                         transition duration-300"
            >
              Discover Our Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;

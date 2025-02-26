import { useRef, useState, useEffect } from "react";
import recipe from "../assets/recipe.pdf";
import styles from "./styles/Recipe.module.css";
import recipeBackground from "../assets/heroImage.webp";

/* -------------------------------------------------------------------------- */
/*                          FadeInSection Component                           */
/* -------------------------------------------------------------------------- */
interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className = "",
}) => {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (domRef.current) {
              observer.unobserve(domRef.current);
            }
          }
        });
      },
      { threshold: 0.2 }
    );
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`
        ${className}
        transition-all duration-1000 ease-out transform
        print:opacity-100 print:translate-y-0
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                          HeroSection Component                             */
/* -------------------------------------------------------------------------- */
const HeroSection = () => {
  return (
    <section
      className="relative overflow-hidden"
      aria-label="Hero Section showcasing Nutcha Bites"
    >
      {/* Background Image */}
      <img
        src={recipeBackground}
        alt="Artistic high-resolution image showcasing Nutcha Bites arranged with matcha and Iloilo bandi elements"
        className="w-full h-screen object-cover"
      />

      {/* Dark Overlay (kept black for contrast) */}
      <div
        className={`absolute inset-0 bg-black opacity-50 ${styles.overlay}`}
        aria-hidden="true"
      ></div>

      {/* Hero Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold font-sans text-white drop-shadow-lg">
            Nutcha Bites
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-serif text-white drop-shadow-md">
            Discover the Fusion: Where Matcha Meets Tradition
          </p>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/*                         IngredientCards Component                          */
/* -------------------------------------------------------------------------- */
const IngredientCards = () => {
  const ingredients = [
    {
      name: "Iloilo Bandi",
      description:
        "A traditional ingredient sourced locally that brings rich heritage and depth to every bite.",
      image: "https://via.placeholder.com/400x300?text=Iloilo+Bandi",
    },
    {
      name: "Culinary-grade Matcha Powder",
      description:
        "High-quality matcha with vibrant, earthy notes designed to perfectly balance the fusion.",
      image: "https://via.placeholder.com/400x300?text=Matcha+Powder",
    },
    {
      name: "Raw Peanuts",
      description:
        "Lightly toasted to a golden hue, offering a delightful crunch and nutty aroma.",
      image: "https://via.placeholder.com/400x300?text=Raw+Peanuts",
    },
  ];

  return (
    <FadeInSection className="mt-12">
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        aria-label="Ingredient Cards"
      >
        {ingredients.map((ingredient, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg group"
            aria-label={`Ingredient card: ${ingredient.name}`}
          >
            <img
              src={ingredient.image}
              alt={`Image of ${ingredient.name}: ${ingredient.description}`}
              className="w-full h-48 object-cover transform transition duration-300 ease-in-out group-hover:scale-105"
            />
            <div
              className="
                absolute inset-0
                bg-gradient-to-t from-black to-transparent
                opacity-0 group-hover:opacity-80
                transition-opacity duration-300 ease-in-out
              "
              aria-hidden="true"
            ></div>
            <div
              className="
                absolute bottom-0 left-0 right-0 p-4
                opacity-0 group-hover:opacity-100
                transition-opacity duration-300 ease-in-out
              "
            >
              <h3 className="text-xl font-bold text-white">
                {ingredient.name}
              </h3>
              <p className="mt-2 text-sm text-white">
                {ingredient.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </FadeInSection>
  );
};

/* -------------------------------------------------------------------------- */
/*                          RecipeTimeline Component                          */
/* -------------------------------------------------------------------------- */
export const RecipeTimeline = () => {
  const recipeSteps = [
    {
      title: "Sourcing & Preparation",
      description:
        "Preheat your workspace by lining a baking sheet and toast the peanuts to a light golden color.",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          role="img"
          aria-hidden="true"
          aria-label="Sourcing & Preparation icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      ),
    },
    {
      title: "Make the Sugar Syrup",
      description:
        "Combine muscovado, white sugar, water, and salt in a heavy-bottomed pan. Cook until the syrup reaches the hard-crack stage (300°F–310°F).",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          role="img"
          aria-hidden="true"
          aria-label="Make the Sugar Syrup icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Incorporate Flavors",
      description:
        "Remove from heat and quickly stir in unsalted butter (and optional vanilla extract), toasted peanuts, sifted matcha, and baking soda. Watch the mixture foam as the soda reacts.",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          role="img"
          aria-hidden="true"
          aria-label="Incorporate Flavors icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
          />
        </svg>
      ),
    },
    {
      title: "Form the Bites",
      description:
        "Pour the hot mixture onto the prepared baking sheet and spread evenly (about 1/8-inch thick). Optionally, lightly score the surface to guide portioning.",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          role="img"
          aria-hidden="true"
          aria-label="Form the Bites icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      ),
    },
    {
      title: "Cutting & Finishing",
      description:
        "Allow the candy to cool completely, then cut into bite-sized pieces. Optionally, finish with a dusting of extra sifted matcha and a pinch of sea salt.",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          role="img"
          aria-hidden="true"
          aria-label="Cutting & Finishing icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4l16 16M4 20L20 4"
          />
        </svg>
      ),
    },
  ];

  return (
    <FadeInSection className="mt-16">
      <div
        className="relative pl-12"
        id="recipe-timeline"
        aria-label="Recipe Timeline"
      >
        <div
          className="absolute left-6 top-0 bottom-0 w-1 bg-[var(--color-tertiary-20)]"
          aria-hidden="true"
        ></div>
        <div className="space-y-12">
          {recipeSteps.map((step, index) => (
            <div
              key={index}
              className="
                flex items-start
                transition-transform duration-500 ease-out
                transform hover:scale-105
              "
              aria-label={`Recipe step: ${step.title}`}
            >
              <div className="flex flex-col items-center mr-4 relative">
                <div
                  className="
                    bg-[var(--color-tertiary)]
                    rounded-full h-12 w-12
                    flex items-center justify-center z-10
                  "
                >
                  {step.icon}
                </div>
                {index !== recipeSteps.length - 1 && (
                  <div
                    className="flex-1 w-px bg-[var(--color-tertiary-20)] mt-1"
                    aria-hidden="true"
                  ></div>
                )}
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md w-full">
                <h3 className="text-xl font-bold font-sans text-[var(--color-tertiary)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[var(--color-secondary-70)] font-serif">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
};

/* -------------------------------------------------------------------------- */
/*                       PrintRecipeCard (Download) Btn                       */
/* -------------------------------------------------------------------------- */
const PrintRecipeCard = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = recipe; // PDF import
    link.download = "NutchaBitesRecipe.pdf"; // The desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="
        bg-gradient-to-r
        from-[var(--color-accent)]
        to-[var(--color-accent-80)]
        text-white font-bold py-3 px-6 rounded-lg shadow-md
        hover:shadow-xl transform hover:scale-105
        transition duration-300 ease-in-out
      "
      aria-label="Download Recipe Card"
    >
      Print Recipe Card
    </button>
  );
};

/* -------------------------------------------------------------------------- */
/*                          CTAButtons Component                              */
/* -------------------------------------------------------------------------- */
const CTAButtons = () => {
  return (
    <FadeInSection className="mt-16">
      <div
        className="flex gap-4 justify-center"
        aria-label="Call to Action Buttons"
      >
        <button
          className="
            bg-[var(--color-tertiary)]
            text-white font-bold py-3 px-6 rounded-lg shadow-md
            hover:shadow-xl transform hover:scale-105
            transition duration-300 ease-in-out
          "
          aria-label="Buy Nutcha Bites"
        >
          Buy Nutcha Bites
        </button>
        <PrintRecipeCard />
      </div>
    </FadeInSection>
  );
};

/* -------------------------------------------------------------------------- */
/*                         Main NutchaBitesRecipe Page                        */
/* -------------------------------------------------------------------------- */
const NutchaBitesRecipe = () => {
  const [showNutrition, setShowNutrition] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="
        max-w-7xl mx-auto p-4
        bg-[var(--color-primary)]
        text-[var(--color-secondary-80)]
      "
      aria-label="Nutcha Bites Recipe Page"
    >
      <HeroSection />
      <IngredientCards />

      {/* This section is wrapped to be downloaded as PDF */}
      <div className="printable-section" ref={timelineRef}>
        <RecipeTimeline />
      </div>

      {/* Fusion Story Section */}
      <FadeInSection className="relative mt-16">
        <div
          className="
            absolute inset-0
            bg-[url('https://via.placeholder.com/800x600?text=Texture')]
            bg-cover bg-center
            opacity-20 pointer-events-none
          "
          aria-hidden="true"
        ></div>
        <section
          className="
            relative bg-white p-6 rounded-lg shadow-inner
            flex flex-col md:flex-row
          "
          aria-label="Fusion Story"
        >
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4 text-[var(--color-tertiary)] font-sans">
              The Fusion Story
            </h2>
            <p className="text-[var(--color-secondary-70)] font-serif">
              Nutcha Bites is born from a deep passion for merging the
              time-honored traditions of Iloilo bandi with the modern vibrancy
              of matcha. Our process carefully balances heritage and
              innovation—each step is crafted to create a unique culinary
              experience.
            </p>
            <p className="mt-4 text-[var(--color-secondary-70)] font-serif">
              Every bite tells a story of local craftsmanship, careful sourcing,
              and meticulous preparation.
            </p>
          </div>
          <div className="md:w-1/3 mt-6 md:mt-0 flex items-center justify-center">
            <blockquote
              className="
                italic text-[var(--color-secondary-60)]
                border-l-4 border-[var(--color-accent)]
                pl-4 font-serif
              "
              aria-label="Fusion Story Quote"
            >
              "A harmonious blend of history and modernity in every bite."
            </blockquote>
          </div>
        </section>
        <div className="relative mt-8 flex justify-center">
          <img
            src="https://via.placeholder.com/600x200?text=Fusion+Infographic"
            alt="Infographic illustrating the fusion of matcha and Iloilo bandi through artistic elements"
            className="rounded-lg shadow-lg"
          />
        </div>
      </FadeInSection>

      {/* CTA Buttons */}
      <CTAButtons />

      {/* Toggle Button for Nutritional Information */}
      <FadeInSection className="mt-4">
        <div className="flex justify-center">
          <button
            onClick={() => setShowNutrition((prev) => !prev)}
            className="
              bg-[var(--color-tertiary)]
              hover:bg-[var(--color-tertiary-80)]
              text-white font-bold py-2 px-4 rounded
              transition duration-300
            "
            aria-label="Toggle Nutritional Information"
          >
            {showNutrition ? "Hide Nutritional Info" : "Show Nutritional Info"}
          </button>
        </div>
      </FadeInSection>

      {showNutrition && (
        <FadeInSection className="mt-8">
          <section
            className="p-4 bg-white rounded-lg shadow"
            aria-label="Nutritional Information"
          >
            <h3 className="text-xl font-bold mb-4 text-[var(--color-tertiary)] font-sans">
              Nutritional Information
            </h3>
            <ul className="list-disc list-inside text-[var(--color-secondary-70)] font-serif">
              <li>Calories: X kcal</li>
              <li>Fat: X g</li>
              <li>Carbohydrates: X g</li>
              <li>Protein: X g</li>
            </ul>
          </section>
        </FadeInSection>
      )}
    </div>
  );
};

export default NutchaBitesRecipe;

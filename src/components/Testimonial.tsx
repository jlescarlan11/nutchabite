import React from "react";

/* -------------------------------------------------------------------------- */
/*                        Testimonial Data & Helpers                          */
/* -------------------------------------------------------------------------- */
const testimonials = [
  {
    id: 1,
    name: "Maria",
    location: "Iloilo",
    photo: "https://via.placeholder.com/150",
    rating: 5,
    quote:
      "Nutcha Bites combines the best of Iloilo bandi and matcha, creating a flavor explosion that leaves me craving more!",
  },
  {
    id: 2,
    name: "John",
    location: "Iloilo City",
    photo: "https://via.placeholder.com/150",
    rating: 4,
    quote:
      "Absolutely delightful! The fusion of matcha and bandi is unlike anything I've tasted before.",
  },
  {
    id: 3,
    name: "Linda",
    location: "Iloilo",
    photo: "https://via.placeholder.com/150",
    rating: 5,
    quote:
      "Nutcha Bites is a masterpiece. The matcha infusion perfectly complements the traditional bandi taste.",
  },
];

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const totalStars = 5;
  return (
    <div className="flex mt-2 space-x-1">
      {Array.from({ length: totalStars }, (_, index) => {
        const isFilled = index < rating;
        return (
          <svg
            key={index}
            className={`
              w-6 h-6 cursor-pointer transform transition duration-200 ease-in-out
              ${
                isFilled
                  ? "text-[var(--color-tertiary)] hover:scale-110 hover:text-[var(--color-tertiary-80)]"
                  : "text-[var(--color-secondary-30)] hover:scale-110 hover:text-[var(--color-secondary-40)]"
              }
            `}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.447a1 1 0 00-1.175 0l-3.37 2.447c-.784.57-1.838-.197-1.539-1.118l1.285-3.957a1 1 0 00-.364-1.118L2.07 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
          </svg>
        );
      })}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                          Testimonial Card Props                            */
/* -------------------------------------------------------------------------- */
interface Testimonial {
  id: number;
  name: string;
  location: string;
  photo: string;
  rating: number;
  quote: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div
      className="
        group relative
        bg-gradient-to-br
        from-[var(--color-primary)]
        to-[var(--color-tertiary-10)]
        rounded-2xl shadow-lg p-4 sm:p-6 md:p-8
        hover:shadow-2xl transition-shadow duration-300 ease-in-out
        font-sans
      "
    >
      {/* Customer Details */}
      <div className="flex items-center mb-4 sm:mb-6">
        <img
          src={testimonial.photo}
          alt={testimonial.name}
          className="
            w-16 sm:w-20 h-16 sm:h-20
            rounded-full border-4
            border-[var(--color-tertiary)]
            object-cover
          "
        />
        <div className="ml-4 sm:ml-6">
          <h4
            className="
              text-lg sm:text-xl font-extrabold
              text-[var(--color-tertiary)]
              tracking-wide
            "
            style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)" }}
          >
            {testimonial.name}
          </h4>
          <p className="text-xs sm:text-sm text-[var(--color-secondary-60)] tracking-wide">
            {testimonial.location}
          </p>
        </div>
      </div>

      {/* Star Rating */}
      <StarRating rating={testimonial.rating} />

      {/* Testimonial Text */}
      <p className="mt-4 text-[var(--color-secondary-80)] leading-relaxed tracking-normal text-sm sm:text-base">
        {testimonial.quote}
      </p>

      {/* Enhanced Matcha Leaf Icon */}
      <div
        className="
          absolute bottom-4 right-4
          opacity-5 group-hover:opacity-10
          transition-all duration-500 ease-in-out
          transform group-hover:scale-105
        "
      >
        <svg
          className="w-8 sm:w-10 h-8 sm:h-10 text-[var(--color-tertiary)]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C10.355 2 8.868 2.524 7.66 3.47 6.448 4.414 5.538 5.78 5.05 7.29 4.562 8.8 4.5 10.416 4.87 11.938 5.24 13.46 6.038 14.822 7.18 15.8 8.322 16.778 9.748 17.316 11.24 17.316 12.736 17.316 14.218 16.778 15.35 15.8 16.482 14.822 17.27 13.46 17.636 11.938 18.008 10.416 17.95 8.8 17.45 7.29 16.95 5.78 16.04 4.414 14.83 3.47 13.622 2.524 12.138 2 10.5 2 10.5 2z" />
        </svg>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                            CTA Button Component                            */
/* -------------------------------------------------------------------------- */
const CTAButton = () => {
  return (
    <a
      href="/share-review"
      className="
        inline-block
        bg-gradient-to-r
        from-[var(--color-tertiary)]
        to-[var(--color-accent)]
        text-white px-6 py-3
        rounded-full shadow-lg
        hover:shadow-2xl transform hover:scale-105
        transition duration-300 ease-in-out
      "
    >
      Join Our Community of Nutcha Enthusiasts!
    </a>
  );
};

/* -------------------------------------------------------------------------- */
/*                        Main Testimonial Section                            */
/* -------------------------------------------------------------------------- */
const Testimonial = () => {
  return (
    <section className="py-12 bg-[var(--color-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--color-tertiary)]">
            What Our Nutcha Lovers Are Saying
          </h2>
          <p className="mt-2 text-[var(--color-secondary-60)]">
            Real reviews from those who savor the unique fusion of Iloilo bandi
            and matcha in Nutcha Bites.
          </p>
        </div>

        {/* Responsive Grid for Testimonial Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Call-to-Action Button */}
        <div className="mt-12 text-center">
          <CTAButton />
        </div>
      </div>
    </section>
  );
};

export default Testimonial;

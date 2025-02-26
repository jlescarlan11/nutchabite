import React from "react";
import styles from "./styles/Vision.module.css";
import { HashLink } from "react-router-hash-link";

/* -------------------------------------------------------------------------- */
/*                              Pillar Component                              */
/* -------------------------------------------------------------------------- */
interface PillarProps {
  title: string;
  description: string;
  icon: string;
}

const Pillar: React.FC<PillarProps> = ({ title, description, icon }) => (
  <div className="flex flex-col items-center">
    <div
      className="
        w-16 h-16 mb-4
        bg-[var(--color-primary)]
        rounded-full
        flex items-center justify-center
      "
    >
      {/* Icon is decorative; the title conveys its meaning */}
      <img src={icon} alt="" aria-hidden="true" className="w-8 h-8" />
    </div>
    <h3
      className={`
        ${styles["font-playfair"]}
        text-2xl md:text-3xl font-semibold
        text-[var(--color-primary)]
      `}
    >
      {title}
    </h3>
    <p
      className={`
        ${styles["font-inter"]}
        text-sm md:text-base
        text-[var(--color-primary-80)]
        text-center mt-2
      `}
    >
      {description}
    </p>
  </div>
);

/* -------------------------------------------------------------------------- */
/*                                Vision Page                                 */
/* -------------------------------------------------------------------------- */
interface PillarItem {
  title: string;
  description: string;
  icon: string;
}

const Vision: React.FC = () => {
  const pillars: PillarItem[] = [
    {
      title: "Heritage",
      description: "Embracing time-honored traditions.",
      icon: "/assets/icons/heritage.svg",
    },
    {
      title: "Purity",
      description: "Sourcing the finest, authentic ingredients.",
      icon: "/assets/icons/purity.svg",
    },
    {
      title: "Innovation",
      description: "Fusing tradition with creative culinary artistry.",
      icon: "/assets/icons/innovation.svg",
    },
  ];

  return (
    <section
      id="our-vision"
      className={`
        ${styles["fade-in"]}
        relative w-full min-h-screen
        overflow-hidden
      `}
    >
      {/* Background Images */}
      <div className="absolute inset-0 flex" aria-hidden="true">
        <div
          className={`
            w-1/2 h-full
            ${styles["bg-matcha"]}
            bg-cover bg-center
            md:bg-fixed
          `}
        />
        <div
          className={`
            w-1/2 h-full
            ${styles["bg-bandi"]}
            bg-cover bg-center
            md:bg-fixed
          `}
        />
      </div>

      {/* Decorative Gradient Overlay */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-r
          from-[var(--color-tertiary)]
          via-[var(--color-tertiary-60)]
          to-[var(--color-accent)]
          opacity-70
          mix-blend-multiply
        "
        aria-hidden="true"
      ></div>

      {/* Content */}
      <div
        className="
          relative z-10
          container mx-auto
          px-4 py-8 md:py-16
          flex flex-col items-center justify-center
        "
      >
        {/* Headline */}
        <h1
          className={`
            ${styles["font-playfair"]}
            text-3xl md:text-6xl font-bold
            text-[var(--color-primary)]
            mb-4 text-center
          `}
        >
          Our Vision
        </h1>

        {/* Introduction Statement */}
        <p
          className={`
            ${styles["font-inter"]}
            text-base md:text-xl
            text-[var(--color-primary-80)]
            text-center
            max-w-2xl mb-8 md:mb-12
            leading-relaxed
          `}
        >
          At Nutcha Bites, we believe in a world where ancient traditions meet
          modern innovation. Inspired by the tranquil art of matcha and the rich
          culinary heritage of Iloilo, we create treats that are both a journey
          through history and a taste of the future.
        </p>

        {/* Core Pillars */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-8 md:mb-12">
          {pillars.map((pillar, index) => (
            <Pillar
              key={index}
              title={pillar.title}
              description={pillar.description}
              icon={pillar.icon}
            />
          ))}
        </div>

        {/* Call to Action Button */}
        <HashLink
          smooth
          to="/#contactnewsletter"
          className={`
            ${styles["font-inter"]}
            text-base md:text-lg
            px-8 py-3
            bg-[var(--color-primary)]
            text-[var(--color-tertiary)]
            font-semibold rounded-full
            transition-transform duration-300 ease-in-out
            hover:bg-[var(--color-primary-80)]
            hover:scale-105
            hover:shadow-xl
          `}
        >
          Join Us on This Journey
        </HashLink>
      </div>
    </section>
  );
};

export default Vision;

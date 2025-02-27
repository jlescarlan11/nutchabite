// HeroSection.tsx
import React, { memo, Suspense, useMemo } from "react";
import { motion } from "framer-motion";

const LazyHeroBackground = React.lazy(() => import("./LazyHeroBackground"));

interface HeroSectionProps {
  backgroundType?: "image" | "video";
  backgroundSrc: string;
  overlayColor?: string;
  title: string;
  tagline: string;
}

const HeroSection: React.FC<HeroSectionProps> = memo(
  ({
    backgroundType = "image",
    backgroundSrc,
    overlayColor = "rgba(16, 185, 129, 0.7)", // customizable overlay
    title,
    tagline,
  }) => {
    // Memoize animation variants to avoid recreating them on each render
    const titleVariants = useMemo(
      () => ({
        hidden: { y: -50, opacity: 0 },
        visible: { y: 0, opacity: 1 },
      }),
      []
    );

    const taglineVariants = useMemo(
      () => ({
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 },
      }),
      []
    );

    return (
      <section className="relative h-screen overflow-hidden">
        {/* Lazy load the heavy background asset */}
        <Suspense fallback={<div className="absolute inset-0 bg-gray-800" />}>
          <LazyHeroBackground
            backgroundType={backgroundType}
            backgroundSrc={backgroundSrc}
          />
        </Suspense>
        {/* Semi-transparent overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: overlayColor }}
        ></div>
        {/* Animated content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={titleVariants}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            {title}
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={taglineVariants}
            transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
            className="text-xl md:text-2xl mb-8"
          >
            {tagline}
          </motion.p>
        </div>
      </section>
    );
  }
);

export default HeroSection;

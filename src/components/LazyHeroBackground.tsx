// LazyHeroBackground.tsx
import React from "react";
import { motion } from "framer-motion";

interface LazyHeroBackgroundProps {
  backgroundType?: "image" | "video";
  backgroundSrc: string;
}

const LazyHeroBackground: React.FC<LazyHeroBackgroundProps> = ({
  backgroundType = "image",
  backgroundSrc,
}) => {
  if (backgroundType === "image") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundSrc})` }}
      />
    );
  } else {
    return (
      <motion.video
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 object-cover w-full h-full"
        autoPlay
        loop
        muted
      >
        <source src={backgroundSrc} type="video/mp4" />
      </motion.video>
    );
  }
};

export default React.memo(LazyHeroBackground);

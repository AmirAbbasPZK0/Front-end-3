"use client";

import styles from "./style.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import React from "react";
import { FeaturesData } from "./data";

// Define TypeScript interface for FeatureData
interface FeatureType {
  title1: string;
  title2: string;
  src: string;
}

const Features = () => {
  return (
    <main className="h-[40vh] md:h-screen flex justify-center items-center">
      <div className="w-[70%]">
        <p className="pb-4 lg:pb-8 dark:text-[#c6c6c6]">Features & Benefits</p>
        {FeaturesData.map((feature, index) => (
          <Feature key={index} feature={feature} />
        ))}
      </div>
    </main>
  );
};

export default Features;

const anim = {
  initial: { width: 0 },
  open: {
    width: "auto",
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
  },
  closed: { width: 0 },
};

// Use FeatureType for feature prop
const Feature = ({ feature }: { feature: FeatureType }) => {
  const [isActive, setIsActive] = useState(false);

  const { title1, title2, src } = feature;
  return (
    <div
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className={styles.project}
    >
      <p>{title1}</p>
      <motion.div
        variants={anim}
        animate={isActive ? "open" : "closed"}
        className={styles.imgContainer}
      >
        <img src={`/images/${src}`} alt={title1} />
      </motion.div>
      <p>{title2}</p>
    </div>
  );
};

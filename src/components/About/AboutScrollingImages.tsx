"use client";
import { useScroll, useTransform } from "motion/react";
import React, { useRef } from "react";
import { motion } from "framer-motion";

const images = [
  { id: 1, url: "/images/1.webp" },
  { id: 2, url: "/images/2.webp" },
  { id: 3, url: "/images/3.webp" },
  { id: 4, url: "/images/4.webp" },
  { id: 5, url: "/images/5.webp" },
  { id: 6, url: "/images/6.webp" },
];

const AboutScrollingImages = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  return (
    <div className="py-20 md:py-24 overflow-x-hidden">
      <motion.div
        className="flex items-center justify-start gap-4 lg:gap-8"
        ref={ref}
        style={{ translateX: x }}
      >
        {images.map((image) => (
          <img
            key={image.id}
            src={image.url}
            alt="img"
            className="object-cover object-center scrollingImg"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default AboutScrollingImages;

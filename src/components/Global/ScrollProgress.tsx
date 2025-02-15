"use client";
import React from "react";
import { motion, useScroll } from "motion/react";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 5,
          originX: 0,
          backgroundColor: "#ff0088",
          zIndex: 9999,
        }}
      />
    </>
  );
};

export default ScrollProgress;

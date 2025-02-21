"use client";
import React, { useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PreLoader() {
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  useLayoutEffect(() => {
    // Disable scrolling and hide scrollbar
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";

    return () => {
      // Re-enable scrolling after preloader
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, []);

  useLayoutEffect(() => {
    if (isVideoEnded) {
      // Scroll to top before preloader exits
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Allow scrolling after the animation ends
      const timeout = setTimeout(() => {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
      }, 500); // Match the exit animation duration

      return () => clearTimeout(timeout);
    }
  }, [isVideoEnded]);

  return (
    <AnimatePresence>
      {!isVideoEnded && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: isVideoEnded ? "-100%" : 0 }}
          exit={{ y: "-100%", transition: { duration: 0.5 } }}
          className="h-screen w-full bg-white fixed top-0 left-0 z-[200] flex justify-center items-center overflow-hidden"
        >
          <video
            src="/videos/preloader.mp4"
            autoPlay
            playsInline
            muted
            onEnded={() => setIsVideoEnded(true)} // Trigger slide-up after video ends
          ></video>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

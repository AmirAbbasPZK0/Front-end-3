"use client";
import { useState, useRef, useEffect } from "react";
import { FaPlay } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const IntroVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFirstPlay, setIsFirstPlay] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
  const [lastTime, setLastTime] = useState(0);

  useEffect(() => {
    // Disable scrolling when video is playing
    if (isPlaying) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);

    setTimeout(() => {
      if (videoRef.current) {
        if (isFirstPlay) {
          videoRef.current.currentTime = 0; // First time: start from beginning
          setIsFirstPlay(false);
        } else {
          videoRef.current.currentTime = lastTime; // Resume from last background video position
        }

        videoRef.current.volume = 0.2;
        videoRef.current.play();
      }
    }, 500);

    if (backgroundVideoRef.current) {
      setLastTime(backgroundVideoRef.current.currentTime); // Save current time
      backgroundVideoRef.current.pause();
    }
  };

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsPlaying(false);

      if (videoRef.current) {
        videoRef.current.pause();
      }

      if (backgroundVideoRef.current) {
        backgroundVideoRef.current.currentTime = lastTime; // Resume from saved position
        backgroundVideoRef.current.play();
      }
    }
  };

  return (
    <div className="px-4 md:px-8 pb-20 md:pb-24 max-w-7xl mx-auto">
      <div className="relative">
        {/* Background Video */}
        <motion.video
          ref={backgroundVideoRef}
          src="/videos/intro.mp4"
          loop
          playsInline
          muted
          autoPlay
          className="w-full h-screen object-cover object-center rounded-xl"
          initial={{ opacity: 1 }}
          animate={{ opacity: isPlaying ? 0.5 : 1 }}
          transition={{ duration: 0.5 }}
        ></motion.video>

        {/* Play Button (Only visible when not playing) */}
        {!isPlaying && (
          <button
            onClick={handlePlay}
            className="absolute top-0 left-0 right-0 bottom-0 w-fit h-fit m-auto backdrop-blur-md text-4xl md:text-6xl underline bg-opacity-50 px-16 py-6 bg-black/40 rounded-2xl z-10 lg:hover:scale-110 transition-transform duration-300"
          >
            <FaPlay size={40} color="white" />
          </button>
        )}

        {/* Animated Modal for Playing Video */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              data-lenis-prevent="true"
              className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={handleClose}
            >
              <motion.video
                ref={videoRef}
                src="/videos/intro.mp4"
                loop
                playsInline
                controls
                className="w-[90%] md:w-3/4 h-auto max-w-7xl rounded-xl shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.5 }}
              ></motion.video>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default IntroVideo;

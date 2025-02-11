"use client";
import React, { useRef, useEffect } from "react";

const Introduction = () => {
  return (
    <main className="relative h-[150vh] lg:h-[180vh]">
      <Section1 />
      <Section2 />
    </main>
  );
};

const Section1 = () => {
  return (
    <div className="sticky top-16 h-[50vh] lg:h-[80vh] w-full flex flex-col justify-between items-center px-4 md:px-8 lg:px-16 xl:px-24 pb-8">
      <h3 className="text-8xl lg:text-[24rem] font-bold">findora</h3>
      <div className="flex gap-4 dark:text-[#c6c6c6] font-thin text-sm self-start">
        <span className="w-1/2">Strategy, Design, and Performance.</span>
        <span className="w-1/2">Two Engagement Models: Cash or Equity.</span>
      </div>
    </div>
  );
};

const Section2 = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Function to enter fullscreen mode and reset video to the beginning
  const enterFullScreen = () => {
    if (videoRef.current) {
      // Reset the video to the beginning
      videoRef.current.currentTime = 0;

      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        (videoRef.current as any).webkitRequestFullscreen();
      } else if ((videoRef.current as any).mozRequestFullScreen) {
        (videoRef.current as any).mozRequestFullScreen();
      } else if ((videoRef.current as any).msRequestFullscreen) {
        (videoRef.current as any).msRequestFullscreen();
      }

      videoRef.current.controls = true; // Enable controls in fullscreen mode
      videoRef.current.muted = false; // Unmute when fullscreen
      videoRef.current.volume = 0.2; // Set volume to 20% when entering fullscreen
    }
  };

  // Function to detect when fullscreen is exited and mute the video again
  const handleFullScreenChange = () => {
    if (videoRef.current && !document.fullscreenElement) {
      videoRef.current.muted = true; // Mute when exiting fullscreen
    }
  };

  // Add event listener for fullscreen change
  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("MSFullscreenChange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullScreenChange
      );
    };
  }, []);

  return (
    <div className="relative h-screen">
      {/* Background Video */}
      <video
        ref={videoRef}
        src="/videos/science.mp4"
        autoPlay
        loop
        playsInline
        muted
        className="w-full h-screen object-cover object-center"
      ></video>

      {/* Watch Video Button */}
      <button
        onClick={enterFullScreen}
        className="absolute top-0 left-0 right-0 bottom-0 m-auto text-white text-4xl md:text-6xl underline bg-black bg-opacity-50 px-4 py-2 rounded"
      >
        Showreel
      </button>
    </div>
  );
};

export default Introduction;

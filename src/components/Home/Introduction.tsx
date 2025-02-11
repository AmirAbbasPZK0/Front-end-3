"use client";
import React, { useRef, useState } from "react";
import { BiSolidVolumeFull, BiSolidVolumeMute } from "react-icons/bi";

const Introduction = () => {
  return (
    <main className=" relative h-[150vh] lg:h-[180vh]">
      <Section1 />
      <Section2 />
    </main>
  );
};

const Section1 = () => {
  return (
    <div className="sticky top-16 h-[50vh] lg:h-[80vh] w-full flex flex-col justify-between items-center px-4 md:px-8 lg:px-16 xl:px-24 pb-8 ">
      <h3 className=" text-8xl lg:text-[24rem] font-bold">findora</h3>
      <div className=" flex gap-4 dark:text-[#c6c6c6] font-thin text-sm self-start">
        <span className=" w-1/2">Strategy, Design, and Performance.</span>
        <span className=" w-1/2">Two Engagement Models: Cash or Equity.</span>
      </div>
    </div>
  );
};

const Section2 = () => {
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    setMuted(!muted);
  };

  return (
    <div className="relative h-screen">
      <video
        src="/videos/science.mp4"
        autoPlay
        loop
        playsInline
        muted={muted}
        className=" w-full h-screen object-cover object-center"
      ></video>
      <button
        onClick={toggleMute}
        className=" absolute top-10 left-10 bg-black/50 rounded-full p-2"
      >
        {muted ? (
          <BiSolidVolumeMute size={15} color="#ffffff" />
        ) : (
          <BiSolidVolumeFull size={15} color="#ffffff" />
        )}
      </button>
    </div>
  );
};

export default Introduction;

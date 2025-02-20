"use client";
import Image from "next/image";
import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import oLogo from "@/../public/images/o.png";

const WhatIsFindora = () => {
  const [textColor, setTextColor] = useState("#008f7a");
  return (
    <div className="border-t-2 border-[#e8e9f3] dark:border-black">
      <div className=" px-4 md:px-8 flex flex-col justify-center items-center gap-4 pt-20 md:pt-24 pb-8 max-w-4xl mx-auto">
        <div
          className="text-4xl lg:text-6xl h-[15vh] lg:h-[20vh] font-light"
          style={{ color: textColor }}
        >
          <TypeAnimation
            sequence={[
              "Accurate",
              1000,
              () => setTextColor("#008f7a"),
              "Transparent",
              1000,
              () => setTextColor("#eaba33"),
              "Intelligent",
              1000,
              () => setTextColor("#0b87b6"),
              "Trustworthy",
              1000,
              () => setTextColor("#511f78"),
              "Reliable",
              1000,
              () => setTextColor("#c31069"),
              "Scientific",
              1000,
              () => setTextColor("#c67f48"),
              "Unbiased",
              1000,
              () => setTextColor("#284759"),
            ]}
            wrapper="span"
            speed={40}
            deletionSpeed={95}
            repeat={Infinity}
          />
        </div>
        <div className=" flex">
          <span className="text-4xl font-bold">What is find</span>
          <Image
            src={oLogo}
            alt="o"
            width={22}
            height={22}
            className=" object-contain pt-1 lg:pt-2"
          />
          <span className=" text-4xl font-bold"> ra?</span>
        </div>
        <p className=" text-center">
          Misinformation is everywhere, but findora delivers facts. Our AI
          search engine fact-checks sources, analyzes content, and provides
          reliable, transparent answers.
        </p>
      </div>
    </div>
  );
};

export default WhatIsFindora;

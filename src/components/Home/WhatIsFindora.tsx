"use client";
import Image from "next/image";
import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import oLogo from "@/../public/images/o.png";

const WhatIsFindora = () => {
  return (
    <div className="border-t-2 border-[#e8e9f3] dark:border-black">
      <div className=" px-4 md:px-8 flex flex-col justify-center items-center gap-4 pt-20 md:pt-24 pb-8 max-w-4xl mx-auto">
        <div className="text-4xl lg:text-5xl h-[15vh] md:h-[20vh] font-semibold">
          <TypeAnimation
            sequence={[
              "Accurate",
              1000,
              "Transparent",
              1000,
              "Intelligent",
              1000,
              "Trustworthy",
              1000,
              "Reliable",
              1000,
              "Scientific",
              1000,
              "Unbiased",
              1000,
            ]}
            wrapper="span"
            speed={40}
            repeat={Infinity}
          />
        </div>
        <div className=" flex">
          <span className="text-4xl font-bold">What is find</span>
          <Image
            src={oLogo}
            alt="o"
            width={19}
            height={19}
            className=" object-contain pt-[6px] lg:pt-[12px]"
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

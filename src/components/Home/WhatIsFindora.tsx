"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";

const WhatIsFindora = () => {
  return (
    <div className="border-t-2 border-[#e8e9f3] dark:border-black">
      <div className=" px-4 md:px-8 flex flex-col justify-center items-center gap-4 pt-20 md:pt-24 pb-8 max-w-4xl mx-auto">
        <div className="text-4xl lg:text-6xl h-[15vh] lg:h-[20vh] font-light text-red-400">
          <TypeAnimation
            sequence={[
              "findora is Accurate",
              2000,
              "findora is Transparent",
              2000,
              "findora is Intelligent",
              2000,
              "findora is Trustworthy",
              2000,
              2000,
              "findora is Reliable",
              2000,
              "findora is Scientific",
              2000,
              "findora is Unbiased",
              2000,
            ]}
            wrapper="span"
            speed={20}
            repeat={Infinity}
          />
        </div>
        <h3 className=" text-4xl font-bold">What is findora?</h3>
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

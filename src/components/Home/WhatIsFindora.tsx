"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";

const WhatIsFindora = () => {
  return (
    <div className="border-t-2 border-[#e8e9f3] dark:border-black">
      <div className=" px-4 md:px-8 flex flex-col justify-center items-center gap-4 pt-20 md:pt-24 pb-8 max-w-4xl mx-auto">
        <div className="text-4xl lg:text-6xl h-[15vh] lg:h-[20vh] font-bold bg-gradient-to-tr from-[#026095] via-[#511f78] to-[#c31069] bg-clip-text text-transparent">
          <TypeAnimation
            sequence={[
              "We Are Robust",
              2000,
              "We Are Secure",
              2000,
              "We Are Efficient",
              2000,
              "We Are findora",
              2000,
            ]}
            wrapper="span"
            speed={20}
            repeat={Infinity}
          />
        </div>
        <h3 className=" text-4xl font-bold">What is findora?</h3>
        <p className=" text-center">
          Findora is an advanced, free AI search engine that enables users to
          ask AI questions and receive instant, accurate, and factual answers.
        </p>
      </div>
    </div>
  );
};

export default WhatIsFindora;

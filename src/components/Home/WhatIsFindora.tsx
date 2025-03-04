"use client";
import Image from "next/image";
import React from "react";
import oLogo from "@/../public/images/o.png";

const WhatIsFindora = () => {
  return (
    <div className=" px-4 md:px-8 flex flex-col justify-center items-center gap-4 pt-20 md:pt-24 pb-8 max-w-4xl mx-auto">
      <div className=" flex">
        <span className="text-4xl font-bold">What is find</span>
        <Image
          src={oLogo}
          alt="o"
          width={19}
          height={19}
          className=" object-contain pt-[6px] lg:pt-[12px]"
        />
        <span className="text-4xl font-bold"> ra?</span>
      </div>
      <p className=" text-center lg:text-lg">
        Misinformation is everywhere, but findora delivers facts. Our AI search
        engine fact-checks sources, analyzes content, and provides reliable,
        transparent answers.
      </p>
    </div>
  );
};

export default WhatIsFindora;

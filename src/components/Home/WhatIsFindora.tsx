"use client";
import Image from "next/image";
import React from "react";
import oLogo from "@/../public/images/o.png";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";

const WhatIsFindora = () => {
  return (
    <div className="px-4 md:px-8 flex flex-col justify-center items-center gap-4 pt-20 md:pt-24 pb-8 max-w-4xl mx-auto">
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
      <div className="flex flex-col md:flex-row items-center gap-4 text-zinc-700 dark:text-slate-200">
      
        <Link href={"/search-engine"} className="flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black font-medium rounded-full px-4 py-3 lg:hover:scale-105 transition-all duration-300 ease-in-out">Get Started <span><IoIosArrowRoundForward className="text-[33px] pt-1"/></span></Link>
      </div>
    </div>
  );
};

export default WhatIsFindora;

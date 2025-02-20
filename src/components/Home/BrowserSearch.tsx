"use client";
import Image from "next/image";
import React from "react";
import browserImg from "@/../public/images/browser.png";
import Link from "next/link";
import oLogo from "@/../public/images/o.png";
import { motion } from "framer-motion";

const BrowserSearch = () => {
  return (
    <div className=" relative overflow-hidden cursor-not-allowed">
      <div className=" px-4 md:px-8 pb-20 md:pb-24 max-w-7xl mx-auto opacity-50">
        <div className=" flex flex-col lg:flex-row justify-center items-center gap-8">
          <div className="lg:w-1/2">
            <Image src={browserImg} alt="img" className=" rounded-xl" />
          </div>
          <div className="lg:w-1/2 flex flex-col gap-4">
            <div className="flex gap-1">
              <div className=" flex">
                <span className=" text-2xl font-bold">find</span>
                <Image
                  src={oLogo}
                  alt="o"
                  width={16}
                  height={16}
                  className=" object-contain lg:pt-1"
                />
                <span className=" text-2xl font-bold">ra</span>
              </div>

              <span className=" text-2xl font-bold">Browser Search</span>
            </div>
            <p>
              Our free Findora Answer Engine allows users to ask questions in
              natural language and receive detailed, accurate responses tailored
              to their specific queries.
            </p>
            <Link
              href="/"
              className=" bg-[#c31069] rounded-full w-fit text-white py-2 px-4 hover:bg-[#c3106adb] transition-all duration-300 ease-in-out"
            >
              Add to browser
            </Link>
          </div>
        </div>
      </div>
      <div className=" bg-transparent absolute inset-0" />
      <div className="absolute top-10 -left-28">
        <motion.svg
          animate={{ rotate: 360 }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          width="200"
          height="200"
          className="pointer-events-none"
        >
          <path
            id="circlePath"
            d="M100,100 m-100,0 a100,100 0 1,0 200,0 a100,100 0 1,0 -200,0"
            fill="none"
          />
          <text>
            <textPath
              href="#circlePath"
              fill="#c31069"
              className="text-xl uppercase font-black transition-opacity duration-700 ease-out "
            >
              Coming Soon. Coming Soon. Coming Soon. Coming Soon.
            </textPath>
          </text>
        </motion.svg>
      </div>
    </div>
  );
};

export default BrowserSearch;

"use client";
import Image from "next/image";
import React from "react";
import phoneImg from "@/../public/images/phone.png";
import GoooglePlayIcon from "@/../public/images/google_play_icon.webp";
import AppStoreIcon from "@/../public/images/app_store_icon.png";
import Link from "next/link";
import oLogo from "@/../public/images/o.png";
import { motion } from "framer-motion";

const UseOnPhone = () => {
  return (
    <div className=" relative overflow-hidden cursor-not-allowed">
      <div className=" px-4 md:px-8 pb-20 md:pb-24 max-w-7xl mx-auto">
        <div className="relative bg-gradient-to-tr from-[#026095] via-[#511f78] to-[#c31069] rounded-3xl flex flex-col md:flex-row justify-center items-center gap-4 overflow-hidden">
          <div className=" md:w-2/3 flex flex-col gap-4 text-white p-16">
            <div className=" flex flex-col lg:flex-row lg:gap-1">
              <div className="flex gap-1">
                <span className="text-2xl font-bold">Access</span>
                <div className=" flex">
                  <span className=" text-2xl font-bold">find</span>
                  <Image
                    src={oLogo}
                    alt="o"
                    width={13}
                    height={13}
                    className=" object-contain pt-[3px] lg:pt-[6px]"
                  />
                  <span className=" text-2xl font-bold">ra</span>
                </div>
              </div>
              <span className="text-2xl font-bold">on Your Phone</span>
            </div>

            <p className="lg:text-lg">
              findora is available on desktop and mobile. Get the same
              fact-checked search experience wherever you go.
            </p>
            <div className=" flex gap-4">
              <Link href="/">
                <Image
                  src={GoooglePlayIcon}
                  width={150}
                  height={150}
                  alt="google play"
                />
              </Link>
              <Link href="/">
                <Image
                  src={AppStoreIcon}
                  width={150}
                  height={150}
                  alt="app store"
                />
              </Link>
            </div>
          </div>
          <div className=" pt-0 md:pt-8 lg:pt-16 px-16 self-end">
            <Image src={phoneImg} width={250} height={250} alt="phone" />
          </div>
        </div>
      </div>
      <div className=" bg-transparent absolute inset-0" />
      <div className="absolute top-10 -right-28">
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
              fill="#0b87b6"
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

export default UseOnPhone;

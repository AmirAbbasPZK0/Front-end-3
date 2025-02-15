"use client";
import Image from "next/image";
import React, { useRef } from "react";
import phoneImg from "@/../public/images/phone.png";
import { motion, useScroll, useTransform } from "motion/react";
import GoooglePlayIcon from "@/../public/images/google_play_icon.webp";
import AppStoreIcon from "@/../public/images/app_store_icon.png";
import Link from "next/link";

const UseOnPhone = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["20% end", "end end"],
  });
  const heightProgress = useTransform(
    scrollYProgress,
    [0, 1],
    ["10vh", "70vh"]
  );
  const weightProgress = useTransform(scrollYProgress, [0, 1], ["50%", "100%"]);

  return (
    <motion.div>
      <div
        ref={ref}
        className=" px-4 md:px-8 pb-20 md:pb-24 flex items-center justify-center max-w-7xl mx-auto"
      >
        <motion.div
          style={{ height: heightProgress, width: weightProgress }}
          className="relative bg-gradient-to-tr from-[#026095] via-[#511f78] to-[#c31069] rounded-3xl flex flex-col md:flex-row justify-between items-center p-16 overflow-hidden"
        >
          <div className=" md:w-2/3 flex flex-col gap-4 text-white">
            <h6 className=" text-2xl font-bold">
              Access Findora on Your Phone
            </h6>
            <p>
              With Findora, you can effortlessly access all its powerful
              features directly from your phone, giving you the flexibility to
              stay connected, manage your activities, and enjoy a seamless
              experience wherever you are—whether at home, on the go, or
              traveling—all with just a few taps.
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
          <div>
            <Image
              src={phoneImg}
              width={300}
              height={300}
              alt="phone"
              className="pt-20 md:pt-60"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UseOnPhone;

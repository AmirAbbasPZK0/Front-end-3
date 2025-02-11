"use client";
import Image from "next/image";
import React, { useRef } from "react";
import phoneImg from "@/../public/images/phone.webp";
import { motion, useScroll, useTransform } from "motion/react";

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

  const bgColorProgress = useTransform(
    scrollYProgress,
    [0, 1],
    ["#000000", "#ffffff"]
  );

  return (
    <motion.div style={{ backgroundColor: bgColorProgress }}>
      <div
        ref={ref}
        className="px-4 md:px-8 lg:px-16 xl:px-24 py-8 w-full h-screen flex items-center justify-center max-w-7xl mx-auto"
      >
        <motion.div
          style={{ height: heightProgress, width: weightProgress }}
          className="relative bg-gradient-to-tr from-[#6b49f7] via-[#ab61c7] to-[#d571a5] rounded-3xl flex flex-col md:flex-row justify-between items-center p-16 overflow-hidden"
        >
          <div className=" md:w-2/3 flex flex-col gap-4 text-white">
            <h6 className=" text-2xl font-bold">Use iAsk on your phone</h6>
            <p>
              iAsk.Ai (iAsk™ AI) is an advanced free AI search engine that
              enables users to Ask AI questions and receive Instant, Accurate,
              and Factual Answers without ever storing your data.
            </p>
          </div>
          <div>
            <Image src={phoneImg} alt="phone" className="pt-20 md:pt-60" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UseOnPhone;

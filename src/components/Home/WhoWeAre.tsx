"use client";
import React from "react";
import { motion } from "framer-motion";
const WhoWeAre = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-24 py-16">
      <div>
        <div className=" overflow-hidden">
          <motion.h3
            initial={{ y: 175, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className=" text-6xl text-center dark:text-[#fdfdfd]"
          >
            We blend the power of strategy, design, and performance marketing to
            transform {"founders'"} visions into remarkable brands. See our
            services.
          </motion.h3>
        </div>
        <br />
        <br />
        <hr className=" bg-[#373737] border-0 h-[1px]" />
        <br />
        <br />
        <div className=" flex flex-col lg:flex-row gap-16 lg:gap-4">
          <span className="lg:w-1/2 text-xl dark:text-[#e3e3e3]">
            {"Tomorrow’s"} brands, today.
          </span>
          <p className=" lg:w-[20%] text-xl dark:text-[#e3e3e3] ">
            We are a growth accelerator. <br />
            <br /> Since 2013, we have been recognized globally for helping
            founders build market-defining brands that drive sustainable revenue
            and shape culture. <br /> <br /> In 2023, we launched our Venture
            Model to further support founders. <br /> <br /> We partner with
            five clients a year to give each one the focus and care they
            deserve.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;

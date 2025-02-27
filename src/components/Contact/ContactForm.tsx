"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ContactForm = () => {
  return (
    <div className="px-4 md:px-8 py-20 md:py-24 flex justify-center items-center">
      <div className=" flex flex-col gap-20 relative z-10">
        <div className=" text-center space-y-4">
          <h6 className=" text-4xl font-bold">Contact Us</h6>
          <p className=" text-lg">
            Please leave your information below. {"We‘ll"} reply as soon as
            possible.
          </p>
        </div>
        <div className=" flex flex-col gap-6">
          <div className=" flex flex-col lg:flex-row justify-between gap-6">
            <div className=" flex flex-col w-full gap-1">
              <span className=" self-start text-sm font-semibold">
                Your Name
              </span>
              <input
                type="text"
                name=""
                id=""
                className=" outline-none border-2 border-[#d7d7d9] dark:bg-[#111828] rounded-lg focus:border-[#5046e5] py-1 px-2"
              />
            </div>
            <div className=" flex flex-col w-full gap-1">
              <span className=" self-start text-sm font-semibold">
                Your E-mail
              </span>
              <input
                type="text"
                name=""
                id=""
                className=" outline-none border-2 border-[#d7d7d9] dark:bg-[#111828] rounded-lg focus:border-[#5046e5] py-1 px-2"
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <span className=" self-start text-sm font-semibold">Message</span>
            <textarea
              required
              cols={30}
              rows={4}
              name=""
              id=""
              className=" w-full outline-none border-2 border-[#d7d7d9] dark:bg-[#111828] rounded-lg focus:border-[#5046e5] py-1 px-2"
            ></textarea>
          </div>
          <div>
            <ShinySkeuButton />
          </div>
        </div>
      </div>
      <motion.div
        animate={{ translateX: [5, 100] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        className=" w-40 h-40 md:w-52 md:h-52 lg:w-72 lg:h-72 bg-gradient-to-b from-pink-500 to-purple-500 lg:blur-2xl absolute top-40 left-5 opacity-15 rounded-full"
      />
      <motion.div
        animate={{ translateY: [5, 100] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        className=" w-32 h-32 md:w-44 md:h-44 lg:w-64 lg:h-64 bg-gradient-to-b from-pink-500 to-purple-500 lg:blur-2xl absolute top-[20%] right-[10%] opacity-15 rounded-full"
      />
    </div>
  );
};
const ShinySkeuButton = () => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    btnRef?.current?.addEventListener("mouseover", () => {
      parentRef.current?.style.setProperty("--size", "250px");
      parentRef.current?.style.setProperty(
        "--shineColor",
        "rgba(255, 255, 255, 0.3)"
      );
    });

    btnRef?.current?.addEventListener("mouseleave", () => {
      parentRef.current?.style.setProperty("--size", "0px");
      parentRef.current?.style.setProperty(
        "--shineColor",
        "rgba(255, 255, 255, 0.0)"
      );
    });

    btnRef?.current?.addEventListener("mousemove", (e) => {
      parentRef.current?.style.setProperty("--x", e.offsetX + "px");
      parentRef.current?.style.setProperty("--y", e.offsetY + "px");
    });
  }, []);

  return (
    <div ref={parentRef} className="skeuParent">
      <button
        ref={btnRef}
        className=" w-full overflow-hidden font-mono cursor-pointer text-white rounded px-4 py-2 bg-[radial-gradient(100%_100%_at_100%_0%,_#af8bee_0%,_#6903f6_100%)] transition-[box-shadow_0.15s_ease,_transform_0.15s_ease] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[inset_0px_3px_7px_#6903f6] skeu"
      >
        Send
      </button>
    </div>
  );
};

export default ContactForm;

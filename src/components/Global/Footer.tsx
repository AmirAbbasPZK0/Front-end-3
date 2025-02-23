"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const links = [
  { id: 1, title: "Home", href: "/" },
  {
    id: 2,
    title: "About",
    href: "/about",
  },
  {
    id: 3,
    title: "Contact",
    href: "/contact",
  },
  {
    id: 4,
    title: "Blog",
    href: "/blog",
  },
];

const socials = [
  {
    id: 1,
    title: "Facebook",
    href: "https://www.facebook.com",
  },
  {
    id: 2,
    title: "Instagram",
    href: "https://www.instagram.com",
  },
];

export const Footer = () => {
  const text = "findora";
  const slogan = " A Search Engine You Can Trust";
  return (
    <div className="bg-[#f0f0fc] dark:bg-[#111828] py-8">
      <div className=" px-4 md:px-8 max-w-7xl mx-auto">
        <div className=" flex flex-col justify-between gap-24">
          <div className=" flex justify-between gap-4 lg:gap-8">
            <div className=" flex flex-col justify-between gap-4">
              <motion.h6
                initial={{ color: "hsl(340, 82%, 47%)" }}
                animate={{
                  color: ["hsl(340, 82%, 47%)", "hsl(240, 100%, 50%)"],
                  transition: {
                    duration: 4,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "mirror",
                  },
                }}
                className=" text-lg lg:text-4xl"
              >
                {slogan.split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 3,
                      delay: index * 0.1,
                      ease: "anticipate",
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.h6>
              <div className=" text-sm">
                Say Hello: <br /> hello@findora.ai
              </div>
            </div>
            <div className="flex gap-4 lg:gap-16">
              <div className=" flex flex-col justify-between gap-16">
                <div className=" flex flex-col gap-1 text-sm">
                  {links.map((link) => (
                    <Link key={link.id} href={link.href}>
                      {link.title}
                    </Link>
                  ))}
                </div>
                <div className=" text-sm">Montréal—Canada</div>
              </div>
              <div className=" flex flex-col justify-between gap-4">
                <div className=" flex flex-col gap-1 text-sm">
                  {socials.map((social) => (
                    <Link key={social.id} href={social.href}>
                      {social.title}
                    </Link>
                  ))}
                </div>
                <div className=" text-sm">© 2025 findora</div>
              </div>
            </div>
          </div>
          <div className="overflow-hidden flex justify-center items-center text-8xl md:text-[10rem] lg:text-[16rem] xl:text-[20rem] font-bold">
            {text.split("").map((letter, index) => {
              const colors = [
                "#008f7a",
                "#eaba33",
                "#0b87b6",
                "#511f78",
                "#c31069",
                "#c67f48",
                "#284759",
              ];
              const color = colors[index % colors.length]; // This ensures the colors repeat

              return (
                <motion.h1
                  key={index}
                  style={{ color }} // Applying the color to each letter
                  initial={{ opacity: 0, y: -85 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 1,
                    ease: "backInOut",
                  }}
                >
                  {letter}
                </motion.h1>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

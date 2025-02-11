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
  return (
    <div className="bg-black text-white py-8">
      <div className=" px-4 md:px-8 lg:px-16 xl:px-24">
        <div className=" flex flex-col justify-between gap-24">
          <div className=" flex justify-between gap-8">
            <div className=" flex flex-col justify-between gap-4">
              <h6 className=" text-lg lg:text-4xl">Do it once. Do it right.</h6>
              <div>
                New Business: <br /> hello@rejouice.com
              </div>
            </div>
            <div className=" flex gap-16">
              <div className=" flex flex-col justify-between gap-16">
                <div className=" flex flex-col gap-1">
                  {links.map((link) => (
                    <Link key={link.id} href={link.href}>
                      {link.title}
                    </Link>
                  ))}
                </div>
                <div>Montréal—Canada</div>
              </div>
              <div className=" flex flex-col justify-between gap-4">
                <div className=" flex flex-col gap-1">
                  {socials.map((social) => (
                    <Link key={social.id} href={social.href}>
                      {social.title}
                    </Link>
                  ))}
                </div>
                <div>©Copyright 2025</div>
              </div>
            </div>
          </div>
          <div className=" lg:overflow-hidden flex justify-center items-center text-8xl lg:text-[24rem] font-bold">
            {text.split("").map((letter, index) => (
              <motion.h1
                key={index}
                initial={{ opacity: 0, y: -200 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 1,
                  ease: "backInOut",
                }}
              >
                {letter}
              </motion.h1>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

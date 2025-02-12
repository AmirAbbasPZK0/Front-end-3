"use client";
import Link from "next/link";
import { LatestData } from "./data";
import { motion } from "framer-motion";

const Latest = () => {
  return (
    <div className=" pt-16">
      <div className="px-4 md:px-8 lg:px-16 xl:px-24">
        <motion.h3
          initial={{ y: 175, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-6xl text-center dark:text-[#fdfdfd]"
        >
          Discover the latest AI advancements, trends, and breakthroughs. Stay
          updated on cutting-edge innovations shaping the future of technology.
        </motion.h3>
      </div>
      <div className=" flex flex-col pt-16">
        {LatestData.map((data) => (
          <div
            key={data.id}
            className=" relative w-full h-[90vh] lg:bg-fixed bg-cover bg-center"
            style={{ backgroundImage: `url(${data.image})` }}
          >
            <div className="absolute top-0 left-0 bottom-0 right-0 bg-black/20 z-0" />
            <Link
              href="/"
              className=" absolute inset-0 top-0 left-0 right-0 bottom-0 w-fit h-fit m-auto text-2xl md:text-4xl font-bold text-white z-1 underline"
            >
              {data.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Latest;

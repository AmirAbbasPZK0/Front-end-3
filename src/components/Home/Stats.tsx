"use client";
import React, { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

export const Stats = () => {
  return (
    <div className=" max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-24">
      <div className="flex flex-col items-center justify-center sm:flex-row">
        <Stat
          num={14000}
          suffix="+"
          subheading="Verified Sources Indexed"
          color="#c31069"
        />
        <Stat
          num={80}
          suffix="%"
          subheading="Fact-Checks Completed "
          color="#0b87b6"
        />
        <Stat
          num={1}
          suffix="M"
          subheading="Scientific Papers Indexed"
          color="#eaba33"
        />
      </div>
    </div>
  );
};

interface Props {
  num: number;
  suffix: string;
  decimals?: number;
  subheading: string;
  color: string;
}

const Stat = ({ num, suffix, decimals = 0, subheading, color }: Props) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    setHasAnimated(true); // Ensure it only runs once

    animate(0, num, {
      duration: 2.5,
      onUpdate(value) {
        if (!ref.current) return;
        ref.current.textContent = value.toFixed(decimals);
      },
    });
  }, [num, decimals, isInView, hasAnimated]);

  return (
    <div
      style={{ color: color }}
      className="flex w-full flex-col items-center py-8"
    >
      <p className="mb-2 text-center text-4xl font-bold lg:text-5xl">
        <span ref={ref}></span>
        {suffix}
      </p>
      <p className="max-w-48 text-center text-black dark:text-white">
        {subheading}
      </p>
    </div>
  );
};

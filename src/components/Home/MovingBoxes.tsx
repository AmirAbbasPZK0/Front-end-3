"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const MovingBoxes = () => {
  return (
    <section className="w-full px-4 md:px-8 pb-20 md:pb-24 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-7xl mx-auto">
      <div>
        <h3 className="text-2xl font-bold">Findora</h3>
        <p className="my-4 md:my-6">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nobis in
          error repellat voluptatibus ad.
        </p>
        <Link
          href="/"
          className=" bg-[#c31069] rounded-full w-fit text-white py-2 px-4"
        >
          Add to browser
        </Link>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array: (typeof squareData)[0][]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "/images/feature1.jpg",
  },
  {
    id: 2,
    src: "/images/feature2.jpg",
  },
  {
    id: 3,
    src: "/images/feature3.png",
  },
  {
    id: 4,
    src: "/images/feature4.webp",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<any>(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-2 grid-rows-2 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default MovingBoxes;

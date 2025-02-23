"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const MovingBoxes = () => {
  return (
    <section className="w-full px-4 md:px-8 pb-20 md:pb-24 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-7xl mx-auto">
      <div>
        <h3 className="text-2xl font-bold">Dynamic Insights</h3>
        <p className="my-4 md:my-6">
          Get real-time, fact-checked updates from Trending Topics, AI Insights,
          Expert Picks, and User Favorites.
        </p>
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
    src: "/images/moving1.jpg",
  },
  {
    id: 2,
    src: "/images/moving2.jpg",
  },
  {
    id: 3,
    src: "/images/moving3.jpg",
  },
  {
    id: 4,
    src: "/images/moving4.jpg",
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
        backgroundPosition: "right",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Use proper type
  const [squares, setSquares] = useState(generateSquares());

  const shuffleSquares = () => {
    setSquares(generateSquares());

    if (timeoutRef.current) clearTimeout(timeoutRef.current); // Clear before setting
    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  useEffect(() => {
    shuffleSquares();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current); // Cleanup
    };
  }, []);

  return (
    <div className="grid grid-cols-2 grid-rows-2 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default MovingBoxes;

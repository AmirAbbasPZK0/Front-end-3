"use client";
import React, { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(false);
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("theme");
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className="relative w-14 h-6 flex items-center border-2 border-[#e7e7f2] shadow-inner dark:border-white cursor-pointer rounded-full p-1"
      onClick={() => setDarkMode(!darkMode)}
    >
      <FaMoon className="text-black dark:text-white" size={16} />
      <div
        className="absolute bg-[#f9fafd] dark:bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-700"
        style={darkMode ? { left: "0px" } : { right: "0px" }}
      />
      <BsSunFill className="ml-auto text-white" size={16} />
    </div>
  );
};

export default ThemeToggle;

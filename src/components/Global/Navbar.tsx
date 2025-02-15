"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { CiStar, CiBoxList, CiImageOn } from "react-icons/ci";
import { LuCrown } from "react-icons/lu";
import { IoDocumentTextOutline, IoBulbOutline } from "react-icons/io5";
import { PiFeatherLight } from "react-icons/pi";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import Link from "next/link";
import NavLink from "./NavLink";
import { RxHamburgerMenu } from "react-icons/rx";
import LogoBlack from "@/../public/images/findora_logo_black.png";
import LogoWhite from "@/../public/images/findora_logo_white.png";

import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import Image from "next/image";

const Links = [
  { id: 1, title: "Ask AI", icon: CiStar, url: "/" },
  { id: 2, title: "Findora Pro", icon: LuCrown, url: "/pricing" },
  { id: 3, title: "Summary", icon: CiBoxList, url: "/summary" },
  { id: 4, title: "Docs", icon: IoDocumentTextOutline, url: "/docs" },
  { id: 5, title: "Image", icon: CiImageOn, url: "/image" },
  { id: 6, title: "Writer", icon: IoBulbOutline, url: "/writer" },
  { id: 7, title: "Grammar", icon: PiFeatherLight, url: "/grammar" },
];

const Navbar = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showHamMenu, setShowHamMenu] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hamMenuRef = useRef<HTMLDivElement>(null);

  // Find the current page title
  const currentPage = Links.find((link) => link.url === pathname) || {
    title: "Menu",
    icon: null,
  };

  // Toggle dropdown
  const toggleDropDown = () => {
    setShowDropDown((prev) => !prev);
  };

  const toggleHamMenu = () => {
    setShowHamMenu((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutsideHam = (event: MouseEvent) => {
      if (
        hamMenuRef.current &&
        !hamMenuRef.current.contains(event.target as Node)
      ) {
        setShowHamMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideHam);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideHam);
    };
  }, []);

  return (
    <div className="px-4 md:px-8 py-4">
      <div className="flex justify-between items-center p-4 gap-4 dark:text-black">
        <div
          className="relative block xl:hidden bg-[#f9fafc] py-3 px-5 rounded-full shadow-md"
          ref={dropdownRef}
        >
          <button onClick={toggleDropDown} className="flex items-center gap-2">
            {currentPage.icon && <currentPage.icon className="w-5 h-5" />}{" "}
            {/* Icon */}
            <span>{currentPage.title}</span> {/* Title */}
            {showDropDown ? (
              <MdOutlineKeyboardArrowUp />
            ) : (
              <MdOutlineKeyboardArrowDown />
            )}
          </button>
          {showDropDown && (
            <div className="flex flex-col gap-2 absolute top-14 left-0 bg-[#f9fafc] rounded-2xl shadow-md z-[100]">
              {Links.map((link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  className="flex items-center gap-2 px-4 py-2"
                  onClick={() => setShowDropDown(false)} // Close dropdown on link click
                >
                  <link.icon />
                  {link.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link href="/" className="hidden xl:block">
          <Image
            src={LogoBlack}
            alt="logo"
            width={80}
            height={80}
            className="block dark:hidden"
          />
          <Image
            src={LogoWhite}
            alt="logo"
            width={95}
            height={95}
            className="hidden dark:block"
          />
        </Link>

        <div className="hidden xl:flex items-center bg-[#f0f0fc] dark:bg-[#111828] dark:text-white p-2 border-2 border-[#e7e7f2] shadow-inner rounded-full">
          {Links.map((link) => (
            <NavLink link={link} key={link.id} />
          ))}
        </div>
        <div className="hidden lg:flex gap-4">
          <Link href="/" className="hover:underline dark:text-white">
            Sign Up
          </Link>
          <ThemeToggle />
        </div>
        <div className=" flex flex-col items-center gap-4 lg:hidden relative">
          <ThemeToggle />
          <div
            ref={hamMenuRef}
            className=" bg-[#f9fafc] py-3 px-5 rounded-full shadow-md flex justify-center items-center"
          >
            <button onClick={toggleHamMenu}>
              <RxHamburgerMenu size={25} />
            </button>
            {showHamMenu && (
              <div className="flex flex-col gap-2 absolute top-24 left-0 bg-[#f9fafc] rounded-2xl shadow-md z-[100]">
                <Link
                  href="/"
                  className="flex items-center gap-2 px-4 py-2 "
                  onClick={() => setShowHamMenu(false)}
                >
                  Sign Up
                </Link>
                <Link
                  href="/"
                  className="p-4"
                  onClick={() => setShowHamMenu(false)}
                >
                  Download App
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

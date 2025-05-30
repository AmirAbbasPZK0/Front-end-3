"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "@/services/redux/store";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import LogoBlack from "@/../public/images/findora_logo_black.png";
import LogoWhite from "@/../public/images/findora_logo_white.png";
import Image from "next/image";
import { FiPhone } from "react-icons/fi";
import { RiHome2Line } from "react-icons/ri";
import { GoPeople } from "react-icons/go";
import { AnimatePresence } from "framer-motion";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { removeAllFiles } from "@/services/redux/reducers/fileUploadSlice";
import { addResource } from "@/services/redux/reducers/resourceSlice";
import { removeAllUrls } from "@/services/redux/reducers/urlInputSlice";
import { useRouter } from "next/navigation";
import { BsSearch } from "react-icons/bs";
import Slidebar from "../Engine/Slidebar";
import MiniSlideBar from "../Engine/MiniSlideBar";
import useAgent from "@/hooks/useAgent";
import { IoLogInOutline } from "react-icons/io5";

const Links = [
  { id: 1, title: "Home", icon: RiHome2Line, url: "/" },
  { id: 2, title: "Discover", icon: BsSearch, url: "/discover" },
  { id: 3, title: "About", icon: GoPeople, url: "/about" },
  { id: 4, title: "Contact", icon: FiPhone, url: "/contact" },
  { id: 6, title : "Login" , icon : IoLogInOutline , url : "/login"}
];

const Navbar = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {isMobile} = useAgent()


  const openLeftMenu = () => {
    setShowLeftMenu(true);
  };

  // Find the current page title
  const currentPage = Links.find((link) => link.url === pathname) || {
    title: "Menu",
    icon: null,
  };

  // Toggle dropdown
  const toggleDropDown = () => {
    setShowDropDown((prev) => !prev);
  };

  const leftMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutsideLeftMenu = (event: MouseEvent) => {
      if (
        leftMenuRef.current &&
        !leftMenuRef.current.contains(event.target as Node)
      ) {
        setShowLeftMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideLeftMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideLeftMenu);
    };
  }, []);

  useEffect(() => {
    if (showLeftMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showLeftMenu]);

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

  // return(<>
  //   {(!isMobile && (pathname.includes("/c/") || pathname === "/search")) && <MiniSlideBar/>}
  //     <AnimatePresence>
  //       <Slidebar isOpen={showLeftMenu} onClose={()=>setShowLeftMenu(false)}/>
  //     </AnimatePresence>
  // </>)

  return (
    <div>
      <div className="border-b-2 border-[#e8e9f3] dark:border-black">
        <div className="px-4 md:px-8 py-3">
          <div className="flex md:hidden justify-between items-center gap-4">
              <button
                onClick={openLeftMenu}
                className="lg:hidden md:hidden flex font-medium px-3 py-2 rounded-md text-sm lg:text-base overflow-hidden relative transition-transform lg:hover:scale-105 lg:active:scale-95"
              >
                <span className="relative z-10 flex flex-col"><RiBarChartHorizontalLine className="text-[26px]"/></span>
              </button>
              <a href="https://findora.ai">
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
                  width={80}
                  height={80}
                  className="hidden dark:block"
                />
              </a>
            {/* <div className="hidden xl:flex items-center bg-[#f0f0fc] dark:bg-[#111828] dark:text-white p-2 border-2 border-[#e7e7f2] shadow-inner rounded-full">
              {Links.map((link) => (
                <NavLink link={link} key={link.id} />
              ))}
            </div> */}
            {/* <div className="md:hidden hidden">
              <ThemeToggle/>
            </div> */}
            <div className="flex flex-col gap-2 items-center justify-center">
              <ThemeToggle/>
              {/* <div
                className="relative block xl:hidden bg-[#f9fafc] dark:bg-[#111828] py-3 px-3 rounded-full shadow-md"
                ref={dropdownRef}
              >
                <button
                  onClick={toggleDropDown}
                  className="flex items-center gap-2"
                >
                  {currentPage.icon && <currentPage.icon className="w-5 h-5" />}
                  <span>{currentPage.title}</span>
                  {showDropDown ? (
                    <MdOutlineKeyboardArrowUp />
                  ) : (
                    <MdOutlineKeyboardArrowDown />
                  )}
                </button>
                {showDropDown && (
                  <div className="flex flex-col gap-2 absolute top-14 right-0 bg-[#f9fafc] dark:bg-[#111828] rounded-2xl shadow-md z-[100]">
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
              </div> */}
            </div>
          </div>
        </div>
        {(!isMobile) && <MiniSlideBar/>}
              <AnimatePresence>
                <Slidebar isOpen={showLeftMenu} onClose={()=>setShowLeftMenu(false)}/>
              </AnimatePresence>
      </div>
    </div>
    
  );
};

export default Navbar;
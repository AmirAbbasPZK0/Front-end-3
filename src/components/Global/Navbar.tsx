"use client";
import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/services/redux/store";
import endpoints from "@/configs/endpoints";
import restApi from "@/services/restApi";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import Link from "next/link";
import NavLink from "./NavLink";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowForward, IoIosClose, IoMdClose } from "react-icons/io";
import LogoBlack from "@/../public/images/findora_logo_black.png";
import LogoWhite from "@/../public/images/findora_logo_white.png";
import { useAppSelector } from "@/services/redux/store";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import Image from "next/image";
import { FiPhone, FiPlus } from "react-icons/fi";
import { RiHome2Line } from "react-icons/ri";
import { GoPeople } from "react-icons/go";
import { AnimatePresence, motion } from "framer-motion";
import { FaCircleUser } from "react-icons/fa6";
import { FaArrowRight, FaBars } from "react-icons/fa";
import { removeAllFiles } from "@/services/redux/reducers/fileUploadSlice";
import { addRecency, addResource } from "@/services/redux/reducers/resourceSlice";
import { removeAllUrls } from "@/services/redux/reducers/urlInputSlice";
import { useRouter } from "next/navigation";
import { VscDebugBreakpointData } from "react-icons/vsc";

const Links = [
  { id: 1, title: "Home", icon: RiHome2Line, url: "/" },
  { id: 2, title: "About", icon: GoPeople, url: "/about" },
  { id: 3, title: "Contact", icon: FiPhone, url: "/contact" },
];

const Navbar = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showHamMenu, setShowHamMenu] = useState(false);
  const [recentSearch , setRecentSearch] = useState([])
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hamMenuRef = useRef<HTMLDivElement>(null);
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const dispatch = useAppDispatch()
  const router = useRouter()
  const user = useAppSelector(state => state.userSlice)

  const openLeftMenu = () => {
    setShowLeftMenu(true);
  };

  const closeLeftMenu = () => {
    setShowLeftMenu(false);
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

  const initialApiCalls = async () => {
    if (localStorage.getItem('sessionId')){
      const res = await restApi(endpoints.history, true, true).get();
      setRecentSearch(res.data)
    }
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

  useEffect(()=>{
    initialApiCalls()
  },[])

  return (
    <div>
      <div className="border-b-2 border-[#e8e9f3] dark:border-black">
        <div className="px-4 md:px-8 py-3">
          <div className="flex justify-between items-center gap-4">
            <div
              className="relative block xl:hidden bg-[#f9fafc] dark:bg-[#111828] py-3 px-3 rounded-full shadow-md"
              ref={dropdownRef}
            >
              <button
                onClick={toggleDropDown}
                className="flex items-center gap-2"
              >
                {currentPage.icon && <currentPage.icon className="w-5 h-5" />}
                {/* Icon */}
                <span>{currentPage.title}</span> {/* Title */}
                {showDropDown ? (
                  <MdOutlineKeyboardArrowUp />
                ) : (
                  <MdOutlineKeyboardArrowDown />
                )}
              </button>
              {showDropDown && (
                <div className="flex flex-col gap-2 absolute top-14 left-0 bg-[#f9fafc] dark:bg-[#111828] rounded-2xl shadow-md z-[100]">
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
            <div className=" flex flex-col md:flex-row items-center gap-4">
              <Link href="/">
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
              </Link>
              <div>
                <button
                  onClick={openLeftMenu}
                  className="text-white font-medium px-3 py-2 rounded-md text-sm lg:text-base overflow-hidden relative transition-transform lg:hover:scale-105 lg:active:scale-95"
                >
                  <span className="relative z-10 flex flex-col"><FaBars className="text-[26px]"/></span>
                  <motion.div
                    initial={{ left: 0 }}
                    animate={{ left: "-300%" }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "mirror",
                      duration: 4,
                      ease: "linear",
                    }}
                    className="bg-[linear-gradient(to_right,#8f14e6,#e614dc,#e61453,#e68414,#e6e614)] absolute z-0 inset-0 w-[400%]"
                  ></motion.div>
                </button>
              </div>
            </div>
            <div className="hidden xl:flex items-center bg-[#f0f0fc] dark:bg-[#111828] dark:text-white p-2 border-2 border-[#e7e7f2] shadow-inner rounded-full">
              {Links.map((link) => (
                <NavLink link={link} key={link.id} />
              ))}
            </div>
            <div className="hidden lg:flex gap-4">
              <ThemeToggle />
            </div>
            <div className=" flex flex-col items-center gap-4 lg:hidden relative">
              <ThemeToggle />
             
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showLeftMenu && (
          <div className="fixed inset-0 bg-black/50 z-[150]">
            <motion.div
              ref={leftMenuRef}
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative top-0 left-0 md:w-[20vw] w-[80vw] h-screen bg-[#f0f0fc] dark:bg-[#111828] z-[160] flex flex-col justify-around lg:justify-between overflow-y-auto pt-4 pb-4 px-4 lg:pt-16"
            >
              <div className="flex justify-center">
                <button onClick={()=>{
                  dispatch(addRecency())
                  dispatch(removeAllFiles())
                  dispatch(removeAllUrls())
                  dispatch(addResource("web"))
                  router.push("/")
                }} className="flex items-center gap-1 border-2 border-black dark:border-white rounded-full w-fit py-1 px-4">
                  <FiPlus />
                  <span>New Thread</span>
                </button>
              </div>
              <a href={"http://185.110.191.217:3000"} className="p-3 mt-3 flex justify-between items-center rounded-md font-semibold border-2 border-slate-800 dark:border-slate-100">
                  <span>Try Findora</span>
                  <IoIosArrowForward/>
              </a>
              {user.isLogin && 
              <div className="flex flex-col  pt-5">
                <h3 className="text-[20px] font-semibold">Recent</h3>
                <div className="flex flex-col h-[300px] overflow-y-auto items-start pt-3">
                  {recentSearch?.map((item : any , index) => (
                    <p className="flex" key={index}>{item?.question.length > 3 ? `${item?.question.split(0,10)}...` : item?.question}</p>
                  ))}
                </div>
              </div>
              }
              <div className="flex gap-4 items-end justify-between">
                <div className=" flex items-center gap-2">
                  <FaCircleUser size={30} />
                  <div className="flex flex-col md:w-auto">
                    <span>{user.isLogin ? user?.data?.name : "Guess"}</span>
                    <span className=" text-xs opacity-50">Free plan</span>
                  </div>
                </div>

                <button className="flex gap-2 h-10 items-center group">
                  {user.isLogin ? <span className="font-bold">My Profile</span> : <Link className="font-bold" href={"/login"}>Login</Link>}
                  <div className=" lg:group-hover:translate-x-1 transition-transform duration-300">
                    <FaArrowRight />
                  </div>
                </button>
              </div>

              <button
                onClick={closeLeftMenu}
                className=" absolute top-2 right-2"
              >
                <IoIosClose size={30} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
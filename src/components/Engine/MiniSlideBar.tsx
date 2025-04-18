"use client"

import React, { useState } from "react"
import Image from "next/image"
import LogoBlack from "@/../public/images/findora_logo_black.png";
import LogoWhite from "@/../public/images/findora_logo_white.png";
import { CiCirclePlus } from "react-icons/ci";
import { useAppDispatch } from "@/services/redux/store";
import { IoIosArrowDropright } from "react-icons/io";
import { removeAllFiles } from "@/services/redux/reducers/fileUploadSlice";
import { addResource } from "@/services/redux/reducers/resourceSlice";
import { removeAllUrls } from "@/services/redux/reducers/urlInputSlice";
import { useRouter } from "next/navigation";
import Slidebar from "./Slidebar";
import ThemeToggle from "../Global/ThemeToggle/ThemeToggle";


const MiniSlideBar : React.FC = () => {

    const [isOpen , setIsOpen] = useState(false)
    
    const dispatch = useAppDispatch()

    const router = useRouter()

    return(<>
        <div className={`fixed z-50 flex items-center w-[100px] justify-between p-2 flex-col inset-y-0 left-0  max-w-full bg-white dark:bg-[#1F2937] shadow-lg transform
        translate-x-0 transition-transform duration-300 ease-in-out`}>
            <div className="flex flex-col items-center justify-center gap-2">
                <button>
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
                </button>
                <button className="p-3" onClick={()=>{
                    dispatch(addResource("web"))
                    dispatch(removeAllFiles())
                    dispatch(removeAllUrls())
                    router.push("/")
                }}>
                    <CiCirclePlus className="text-[35px]" />
                </button>
                
            </div>
            <div className="flex flex-col gap-4 p-4 items-center justify-center">
                <ThemeToggle/>
                <button onClick={()=>{
                    setIsOpen(item => !item)
                }}>
                    <IoIosArrowDropright className="text-[35px]"/>
                </button>
            </div>
        </div>

        <Slidebar isOpen={isOpen} onClose={()=>setIsOpen(false)}/>
    </>)
}

export default MiniSlideBar
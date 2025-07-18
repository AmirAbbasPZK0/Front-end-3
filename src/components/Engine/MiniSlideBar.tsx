"use client"

import React, { useState } from "react"
import Image from "next/image"
import LogoBlack from "@/../public/images/findora_logo_black.png";
import LogoWhite from "@/../public/images/findora_logo_white.png";
import { CiCirclePlus } from "react-icons/ci";
import { useAppDispatch , useAppSelector } from "@/services/redux/store";
import { IoIosArrowDropright } from "react-icons/io";
import { removeAllFiles } from "@/services/redux/reducers/fileUploadSlice";
import { addRecency, addResource } from "@/services/redux/reducers/resourceSlice";
import { removeAllUrls } from "@/services/redux/reducers/urlInputSlice";
import { useRouter } from "next/navigation";
import useWebSocket from "@/hooks/useWebSocket";
import Slidebar from "./Slidebar";
import ThemeToggle from "../Global/ThemeToggle/ThemeToggle";
import { setCounterToZero } from "@/services/redux/reducers/newThreadSlice";



const MiniSlideBar : React.FC = () => {

    const {setResponse} = useWebSocket()

    const isGenerating = useAppSelector(state => state.newThreadSlice.isAllowed)

    const [isOpen , setIsOpen] = useState(false)
    
    const dispatch = useAppDispatch()

    const router = useRouter()

    return(<>
        <div className={`fixed z-50 flex items-center w-[100px] justify-between p-2 flex-col inset-y-0 left-0  max-w-full bg-white dark:bg-[#1F2937] shadow-lg transform
        translate-x-0 transition-transform duration-300 ease-in-out`}>
            <div className="flex flex-col items-center justify-center gap-2">
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
                {isGenerating ? (<button className="p-3" onClick={()=>{
                    localStorage.setItem("counter" , `${0}`)
                    dispatch(addRecency())
                    dispatch(addResource("web"))
                    dispatch(removeAllFiles())
                    dispatch(removeAllUrls())
                    dispatch(setCounterToZero(0))
                    setResponse({})
                    router.push("/")
                }}>
                    <CiCirclePlus className="text-[35px]" />
                </button>) : (<svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-5 h-10 mr-2 darktext-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  ></path>
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  ></path>
                </svg>)}
                
                
            </div>
            <div className="flex flex-col gap-4 p-4 items-center justify-center">
                <ThemeToggle/>
                <button onClick={()=>{
                    setIsOpen(item => !item)
                }}>
                    {/* <ProfileAvatar size="w-8 h-8" fontSize="" name={`${user?.first_name} ${user?.last_name}`}/> */}
                    <IoIosArrowDropright className="text-[35px]"/>
                </button>
            </div>
        </div>

        <Slidebar isOpen={isOpen} onClose={()=>setIsOpen(false)}/>
    </>)
}

export default MiniSlideBar
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useAppSelector , useAppDispatch } from '@/services/redux/store';
import { addRecency , selectResource } from '@/services/redux/reducers/resourceSlice';
import { removeAllFiles } from '@/services/redux/reducers/fileUploadSlice';
import { removeAllUrls } from '@/services/redux/reducers/urlInputSlice';
import { useRouter } from 'next/navigation';
import { CiCirclePlus } from "react-icons/ci";
import EmailGenratorLogo from "@/../public/images/email.webp"
import ProfileAvatar from "./ProfileAvatar"
import Cookies from 'js-cookie';
import { logOut } from '@/actions/logOut';
import { setCounterToPayload } from '@/services/redux/reducers/newThreadSlice';
import { signOut } from 'next-auth/react';
import HistoryButtons from './HistoryButtons';
import AuthModal from './AuthModal';
import { RiLogoutBoxRLine , RiLoginBoxLine } from "react-icons/ri";
import Image from 'next/image';
import useAgent from '@/hooks/useAgent';
import { MdKeyboardArrowDown } from "react-icons/md";
import { LuCircleUserRound } from "react-icons/lu";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [openAuthModal , setOpenAuthModal] = useState(false)
  const [openPopover , setOpenPopover] = useState(false)

  const router = useRouter()
  const dispatch = useAppDispatch()
  const {isMobile} = useAgent()

  const isAllowed = useAppSelector(state => state.newThreadSlice.isAllowed)
  const counter = useAppSelector(state => state.newThreadSlice.counter)
  const user = useAppSelector(state => state.userSlice)

  const logout = async () => {
    await logOut()
  }

  // close popover if clicked outside
  const popoverRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpenPopover(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => onClose()}
          style={{ zIndex: 40 }}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-[330px] max-w-full bg-white dark:bg-gray-800 shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
        style={{ zIndex: 50 }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 flex justify-between items-center mb-6">
            <h2 className="text-3xl flex items-center font-semibold dark:text-white">
              find<img className='w-[20px] h-[20px] mt-[1.5px]' src='/images/o.png' alt="/logo.png" />ra
            </h2>
            <button onClick={onClose} type='button' className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* New Thread */}
          <nav className='w-full flex flex-col p-1 items-center justify-center'>
            {isAllowed ? (
              <button
                onClick={()=>{
                  dispatch(addRecency())
                  dispatch(removeAllFiles())
                  dispatch(removeAllUrls()) 
                  dispatch(selectResource("web"))
                  dispatch(setCounterToPayload(0))
                  localStorage.setItem("counter" , `${counter}`)
                  router.push("/")
                  onClose()
                }}
                className='p-2.5 w-full m-1 rounded-md gap-2 items-center justify-between flex border-slate-100 bg-slate-100 dark:border-slate-700 dark:bg-slate-700 border-2 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200 group'
              >
                <div className='gap-2 items-center flex'>
                  <CiCirclePlus className='text-[30px] group-hover:rotate-90 transition-transform duration-200'/>
                  <span className='font-semibold'>New Thread</span>
                </div>
                {!isMobile && <span className='font-semibold dark:text-slate-400 text-slate-500'>Shift + D</span>}
              </button>
            ) : (
              <button
                type="button"
                className="cursor-not-allowed bg-transparent font-medium rounded-full text-sm px-6 py-3 inline-flex items-center animate-pulse"
              >
                <svg aria-hidden="true" role="status" className="inline w-5 h-5 mr-2 animate-spin" viewBox="0 0 100 101" fill="none">
                  <path d="M100 50.59c0 27.61-22.39 50-50 50s-50-22.39-50-50 22.39-50 50-50 50 22.39 50 50Z" fill="#E5E7EB"></path>
                  <path d="M93.97 39.04c2.42-.64 3.89-3.13 3.04-5.49-1.72-4.73-4.14-8.74-7.07-12.21C85.85 15.12 80.88 10.72 75.21 7.41 69.54 4.1 63.27 1.94 56.77 1.05c-6.5-.88-12.98-.6-19.03.23-2.48.34-3.9 2.75-3.25 5.12.64 2.34 3.12 3.8 5.59 3.44 4.8-.67 9.69-.54 14.42.31 6.32 1.08 12.22 3.79 17.34 7.85 5.27 4.16 9.34 9.84 11.8 16.09.91 2.36 3.38 3.78 5.83 3.12Z" fill="currentColor"></path>
                </svg>
                Please wait..
              </button>
            )}
          </nav>

          {/* Generate Email */}
          <div className='flex items-center justify-center'>
            {user.isLogin && 
              <button onClick={()=>{
                router.push("/email-generator")
                onClose()
              }} className='p-2.5 w-full m-1 rounded-md gap-2 items-center flex bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200 group'>
                <Image
                  src={EmailGenratorLogo}
                  alt="logo"
                  width={30}
                  height={10}
                  className="group-hover:scale-110 transition-transform duration-200"
                />
                <span className='font-semibold'>Generate Email</span>
              </button>
            }
          </div>

          {/* Recent Searches */}
          {(user?.isLogin && user?.data !== undefined) && (
            <div className='flex p-3 flex-col gap-2 pt-3 overflow-hidden'>
              <h3 className='text-[20px] p-1 font-semibold'>Recent Searches</h3>           
              <nav className='flex flex-col gap-2 md:h-[200px] h-[300px] overflow-y-auto'>
                {user?.history?.map((item : any) => (
                  <div key={item?.code}>
                    <HistoryButtons item={item} onClose={onClose}/>
                  </div>
                ))}
              </nav>
            </div>
          )}          

          <nav className='w-full mt-auto flex flex-col items-center gap-3'>
            <div className='flex flex-row justify-between items-center w-full'>
              <div className='flex flex-row w-full items-center gap-2'>
                {(user?.isLogin || user?.data !== undefined) ? (
                  <div className='justify-end gap-2 flex-col flex w-full relative' ref={popoverRef}>
                    <button 
                      className='flex p-2 py-4 flex-row justify-start gap-2 items-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600 rounded-md transition-colors duration-200'
                      onClick={() => setOpenPopover(prev => !prev)}
                    >
                      <ProfileAvatar name={user.data?.email || ""} size={'w-8 h-8'} fontSize={''}/>
                      <h1 className='font-semibold'>{user.data?.email}</h1>
                      <MdKeyboardArrowDown/>
                    </button>

                    {openPopover && (
                      <div className="absolute bottom-14 left-2 w-[94%] bg-white dark:bg-gray-700 border rounded-lg shadow-lg p-3 z-50" style={{ zIndex: 51 }}>
                        <p className="text-sm font-medium">{user.data?.first_name} {user.data?.last_name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-300 mb-2">{user.data?.email}</p>
                        <button 
                          onClick={()=> {
                            onClose()
                            router.push("/profile")
                          }}
                          className='w-full px-3 py-2 flex items-center justify-between dark:text-zinc-100 text-zinc-600 hover:bg-zinc-50 dark:hover:bg-gray-600 rounded-md'
                        >
                          <span>Profile</span>
                          <LuCircleUserRound className='text-[18px]'/>
                        </button>
                        <button 
                          onClick={async ()=> {
                            await signOut()
                            Cookies.set("access_token" , "" , {expires : 0})
                            logout()
                            window.location.reload()
                            router.push("/")
                          }}
                          className='w-full px-3 py-2 flex items-center justify-between dark:text-red-400 text-red-600 hover:bg-red-50 dark:hover:bg-gray-600 rounded-md'
                        >
                          <span>Logout</span>
                          <RiLogoutBoxRLine className='text-[18px]'/>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className='flex flex-col w-full gap-2'>
                    <button onClick={()=> {
                      onClose()
                      setOpenAuthModal(true)
                    }} className="w-full flex flex-row justify-between items-center text-center p-4 font-semibold transition-all bg-slate-950 hover:bg-slate-800 border-2 border-slate-950 hover:border-slate-800 text-white rounded-t-md">
                      Login <RiLoginBoxLine className='text-[20px]'/>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
      {openAuthModal && <AuthModal setClose={setOpenAuthModal}/>}
    </>
  );
};

export default Sidebar;

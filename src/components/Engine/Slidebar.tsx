import React from 'react';
import { useAppSelector } from '@/services/redux/store';
import { useAppDispatch } from '@/services/redux/store';
import { addRecency , addResource } from '@/services/redux/reducers/resourceSlice';
import { removeAllFiles } from '@/services/redux/reducers/fileUploadSlice';
import { removeAllUrls } from '@/services/redux/reducers/urlInputSlice';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';
import { GrUpgrade } from "react-icons/gr";
import { IoIosArrowForward } from 'react-icons/io';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {

  const router = useRouter()

  const dispatch = useAppDispatch()

  const user = useAppSelector(state => state.userSlice)

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={()=>{
            onClose()
          }}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-[300px] max-w-full bg-white dark:bg-gray-800 shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-6 flex flex-col gap-3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl flex items-center bottom-0 font-semibold dark:text-white">
              find<img className='w-[14px] h-[14px] mt-1.5' src='/images/o.png' alt="/logo.png" />ra
            </h2>
            <button onClick={()=>{
              onClose()
            }} type='button' className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className='w-full flex items-center justify-center'>
            <button onClick={()=>{
                  dispatch(addRecency())
                  dispatch(removeAllFiles())
                  dispatch(removeAllUrls())
                  dispatch(addResource("web"))
                  router.push("/search-engine")
                  onClose()
            }} className='flex items-center flex-row gap-2 border-2 rounded-[30px] px-2 py-1 border-slate-950 dark:border-slate-100 bg-none dark:text-white'><FaPlus/><span>New Thread</span></button>
          </nav>
          {user.isLogin && <div className='flex flex-col gap-2 pt-3'>
            <h3 className='text-[20px] font-semibold'>Recent Searches</h3>
            <nav className='flex flex-col gap-2 h-[300px] overflow-y-auto'>
              {user.history?.map((item : {question : string} , index : number) => (
                <div key={index}>
                  <p>{item.question}</p>
                </div>
              ))}
            </nav>
          </div>}
          <nav className='w-[80%] flex flex-col items-center gap-3 h-[20vh] justify-center fixed bottom-0'>
            <div className='flex items-center justify-between gap-6'>
            <button className='flex items-center flex-row gap-2 border-2 px-4 rounded-[30px] p-3 border-slate-950 dark:border-slate-100 bg-none dark:text-white'>
              <GrUpgrade/>
              <span>Upgrade plan</span>
            </button>
            </div>
            <div className='flex flex-row justify-between items-center w-full'>
              <div className='flex flex-row items-center gap-2'>
                <img src="/images/guest-user.webp" alt="Guest User" className="w-12 h-12 rounded-full"/>
                <div className='flex flex-col'>
                  <h4 className='dark:text-white text-[12px]'>{user.isLogin ? user.data?.name : "Guess"}</h4>
                  <p className='text-slate-400 text-[13px]'>Free plan</p>
                </div>
              </div>
              {user.isLogin ? (<>
                <div className='flex dark:text-white flex-row items-center gap-2'>
                  <span className='text-[13px] font-semibold'>My Profile</span>
                  <IoIosArrowForward/>
                </div>
              </>) : (<>
                <div className='flex dark:text-white flex-row items-center gap-2'>
                  <Link className='text-[13px] font-semibold' href={"/login"}>Login</Link>
                  <IoIosArrowForward/>
                </div>
              </>)}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
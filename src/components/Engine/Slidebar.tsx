import React, { useState } from 'react';
import { useAppSelector , useAppDispatch } from '@/services/redux/store';
import { addRecency , selectResource } from '@/services/redux/reducers/resourceSlice';
import { removeAllFiles } from '@/services/redux/reducers/fileUploadSlice';
import { removeAllUrls } from '@/services/redux/reducers/urlInputSlice';
import { useRouter } from 'next/navigation';
import { CiCirclePlus } from "react-icons/ci";
import EmailGenratorLogo from "@/../public/images/email.webp"
import ProfileAvatar from "./ProfileAvatar"
import Link from 'next/link';
import Cookies from 'js-cookie';
import { logOut } from '@/actions/logOut';
import { setCounterToPayload } from '@/services/redux/reducers/newThreadSlice';
import { signOut } from 'next-auth/react';
import HistoryButtons from './HistoryButtons';
import AuthModal from './AuthModal';
import ProfileToolTip from './ProfileToolTip';
import { RiLogoutBoxRLine , RiLoginBoxLine } from "react-icons/ri";
import Image from 'next/image';


interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {

  const [openAuthModal , setOpenAuthModal] = useState(false)

  const router = useRouter()

  const dispatch = useAppDispatch()

  const isGenerating = useAppSelector(state => state.newThreadSlice.isAllowed)

  const counter = useAppSelector(state => state.newThreadSlice.counter)

  const user = useAppSelector(state => state.userSlice)

  const logout = async () => {
    await logOut()
  }

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
        className={`fixed inset-y-0 left-0 w-[330px] max-w-full bg-white dark:bg-gray-800 shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex flex-col">
          <div className="p-6 flex justify-between items-center mb-6">
            <h2 className="text-3xl flex items-center bottom-0 font-semibold dark:text-white">
              find<img className='w-[20px] h-[20px] mt-[1.5px]' src='/images/o.png' alt="/logo.png" />ra
            </h2>
            <button onClick={()=>{
              onClose()
            }} type='button' className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className='w-full flex flex-col p-1 items-center justify-center'>
            {isGenerating ? (<>
              <button onClick={()=>{
                  dispatch(addRecency())
                  dispatch(removeAllFiles())
                  dispatch(removeAllUrls()) 
                  dispatch(selectResource("web"))
                  dispatch(setCounterToPayload(0))
                  localStorage.setItem("counter" , `${counter}`)
                  // socket.removeAllListeners();
                  router.push("/")
                  onClose()
              }} className='p-2.5 w-full m-1 rounded-md gap-2 items-center flex border-slate-100 bg-slate-100 dark:border-slate-700 dark:bg-slate-700 border-2'><CiCirclePlus className='text-[30px]'/><span className='font-semibold'>New Thread</span></button>
            </>) : (<>
              <button
                type="button"
                className=" cursor-not-allowed bg-transparent focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm px-6 py-3 text-center inline-flex items-center animate-pulse "
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-5 h-5 mr-2 darktext-white animate-spin"
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
                </svg>
                Please wait..
              </button>
            </>)}
          </nav>
          <div className='flex items-center justify-center'>
            <button onClick={()=>{
              router.push("/email-generator")
              onClose()
            }} className='p-2.5 w-full m-1 rounded-md gap-2 items-center flex bg-blue-500 text-white'>
              <Image
                src={EmailGenratorLogo}
                alt="logo"
                width={30}
                height={10}
                className=""
              />
              <span className='font-semibold'>Generate Email</span>
            </button>
          </div>
          {(user?.isLogin && user?.data !== undefined) && <div className='flex p-3 flex-col gap-2 pt-3'>
            <h3 className='text-[20px] p-1 font-semibold'>Recent Searches</h3>           
            <nav className='flex flex-col gap-2 md:h-[400px] h-[300px] overflow-y-auto'>
              {user?.history?.map((item : any) => (
                <div key={item?.code}>
                    <HistoryButtons item={item} onClose={onClose}/>
                </div>
              ))}
            </nav>
          </div>}          
          <nav className='w-full flex flex-col items-center gap-3 h-[20vh] justify-end fixed bottom-0'>
            
            
            <div className='flex flex-row justify-between items-center w-full'>
              <div className='flex flex-row w-full items-center gap-2'>
                {(user?.isLogin || user?.data !== undefined) ? (<>
                  <div className='justify-end gap-2 flex-col flex w-full'>
                    <div className='flex p-2 flex-row justify-start gap-2 items-center'>
                      <ProfileAvatar name={user.data?.first_name || ""} size={'w-8 h-8'} fontSize={''}/>
                      <h1 className='font-semibold'>{user.data?.email}</h1>
                    </div>
                    <button onClick={async ()=> {
                      await signOut()
                      Cookies.set("access_token" , "" , {expires : 0})
                      logout()
                      window.location.reload()
                      router.push("/")
                    }} className='p-4 w-full flex bg-red-500 text-white items-center justify-between'>
                      <span className='font-semibold'>Logout</span>
                      <RiLogoutBoxRLine className='text-[20px]'/>
                    </button>
                  </div>
                </>) : (<>
                  <div className='flex flex-col w-full gap-2'>
                    <div className='flex w-full flex-row items-center'>
                      <button onClick={()=> {
                        onClose()
                        setOpenAuthModal(true)
                      }} className="w-full flex flex-row justify-between items-center text-center p-4 font-semibold transition-all bg-slate-950 border-2 border-slate-950 text-white">
                        Login <RiLoginBoxLine className='text-[20px]'/>
                      </button>
                    </div>
                  </div>
                </>)}
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
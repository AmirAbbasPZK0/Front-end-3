import React from 'react';
import { useAppSelector , useAppDispatch} from '@/services/redux/store';
import { addRecency , addResource, removeRecency } from '@/services/redux/reducers/resourceSlice';
import { removeAllFiles } from '@/services/redux/reducers/fileUploadSlice';
import { removeAllUrls } from '@/services/redux/reducers/urlInputSlice';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';
import ProfileAvatar from "./ProfileAvatar"
import Link from 'next/link';
import useWebSocket from '@/hooks/useWebSocket';
import Cookies from 'js-cookie';
import { logOut } from '@/actions/logOut';
import { checkHistory } from '@/services/redux/reducers/newThreadSlice';
import { setCounterToZero } from '@/services/redux/reducers/newThreadSlice';
import { signOut } from 'next-auth/react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {

  const {setResponse} = useWebSocket()

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
        <div className="flex flex-col gap-3">
          <div className="p-6 flex justify-between items-center mb-6">
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
            {isGenerating ? (<>
              <button onClick={()=>{
                  dispatch(addRecency())
                  dispatch(removeAllFiles())
                  dispatch(removeAllUrls())
                  dispatch(addResource("web"))
                  dispatch(setCounterToZero(0))
                  localStorage.setItem("counter" , `${counter}`)
                  // socket.removeAllListeners();
                  router.push("/")
                  onClose()
            }} className='flex items-center flex-row gap-2 border-2 rounded-[30px] px-2 py-1 border-slate-950 dark:border-slate-100 bg-none dark:text-white'><FaPlus/><span>New Thread</span></button>
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
          {(user?.isLogin && user?.data !== undefined) && <div className='flex p-3 flex-col gap-2 pt-3'>
            <h3 className='text-[20px] font-semibold'>Recent Searches</h3>
            <nav className='flex flex-col gap-2 h-[300px] overflow-y-auto'>
              {user?.history?.map((item : any) => (
                <div key={item?.code}>
                  {item.conversation?.length > 0 &&
                   <button className='text-left' onClick={()=> {
                    if(window.location.href.split("/c/")[1] === item?.code){
                      console.log("current")
                    }else{
                      setResponse({})
                      router.push(`/c/${item?.code}`)
                      dispatch(checkHistory(true))
                      dispatch(removeRecency())
                      dispatch(setCounterToZero(item?.conversation?.[item?.conversation?.length - 1]?.id + 1))
                      localStorage.setItem("counter" , `${counter}`)
                      onClose()
                    }
                  }}>
                    <p className="text-[12px]">{item?.title}</p>
                  </button>}
                </div>
              ))}
            </nav>
          </div>}
          <nav className='w-full flex flex-col items-center gap-3 h-[20vh] justify-center fixed bottom-0'>
            <div className='flex items-center justify-between gap-6'>
            {/* <button className='flex items-center flex-row gap-2 border-2 px-4 rounded-[30px] p-3 border-slate-950 dark:border-slate-100 bg-none dark:text-white'>
              <GrUpgrade/>
              <span>Upgrade plan</span>
            </button> */}
            </div>
            
            <div className='flex flex-row justify-between items-center w-full'>
              <div className='flex flex-row w-full items-center gap-2'>
                {(user?.isLogin || user?.data !== undefined) ? (<>
                  <div className='flex w-full p-3 flex-col pb-10 gap-2'>
                      <div className='flex flex-row gap-3 items-center justify-start'>
                        <ProfileAvatar name={`${user?.data?.first_name} ${user?.data?.last_name}`}/>
                        <h1 className='text-[14px] font-semibold'>{user?.data?.email}</h1>
                      </div>
                      <button onClick={ async()=>{
                        await signOut()
                        Cookies.set("access_token" , "" , {expires : 0})
                        logout()
                        window.location.reload()
                      }} className="w-full items-center text-center p-2 font-semibold transition-all bg-red-500  text-white rounded-md">
                        Logout
                      </button>
                  </div>
                </>) : (<>
                  <div className='flex pb-10 p-3 flex-col w-full gap-2'>
                    <div>
                      <h1 className="text-[14px] font-semibold">Guest</h1>
                    </div>
                    <div className='flex w-full flex-row items-center'>
                      <Link onClick={()=> onClose()} href={"/login"} className="w-full items-center text-center p-2 font-semibold transition-all bg-slate-950  border-2 border-slate-950  text-white rounded-md">
                        Login
                      </Link>
                    </div>
                  </div>
                </>)}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
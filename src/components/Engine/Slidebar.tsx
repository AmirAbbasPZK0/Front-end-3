import React , {useState} from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/services/redux/store';
import { usePathname } from 'next/navigation';
import { useAppDispatch } from '@/services/redux/store';
import { addRecency , addResource } from '@/services/redux/reducers/resourceSlice';
import { removeAllFiles } from '@/services/redux/reducers/fileUploadSlice';
import { removeAllUrls } from '@/services/redux/reducers/urlInputSlice';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';
import { GiUpgrade } from 'react-icons/gi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';


interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {

  const [showMore , setShowMore] = useState(false)
  const router = useRouter()

  const pathname = usePathname()
  const dispatch = useAppDispatch()


  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={()=>{
            onClose()
            setShowMore(false)
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
              Find<img className='w-[14px] h-[14px] mt-0.5' src='/o.webp' alt="/logo.png" />ra
            </h2>
            <button onClick={()=>{
              onClose()
              setShowMore(false)
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
                  router.push("/")
                  onClose()
            }} className='flex items-center flex-row gap-2 border-2 rounded-[30px] px-2 py-1 border-slate-950 dark:border-slate-100 bg-none dark:text-white'><FaPlus/><span>New Thread</span></button>
          </nav>
          {/* <div className='w-full flex flex-row justify-center bg-slate-700 rounded-md'>
            <button><ChosenIcon e='search' className='text-white mx-2 text-[24px]'/></button>
            <input type="text" placeholder='Search' className='p-2 outline-none dark:text-white w-full bg-slate-700 rounded-md'/>
          </div> */}
          <nav className='flex flex-col gap-2'>
            {/* <h4 className="dark:text-white text-[12px]">Recent</h4> */}
            {/* <ul className='flex overflow-y-auto flex-col h-[40vh]'>
              {utils.uniqueByProperty(userReducer?.history, 'code')?.slice(0,showMore ? utils.uniqueByProperty(userReducer?.history, 'code').length - 1 : 5)?.reverse()?.map((history, index) =>
                <li key={index}>
                  <Link className={`${pathname === `/search/${history.code}` ? "text-slate-800 dark:text-slate-100" : "dark:text-white font-normal"} flex font-extralight text-[14px] items-center gap-1`} href={`/search/${history.code}/`}>
                     {history.question.replaceAll('*', '').replaceAll('=','').substring(0,30)}
                  </Link>
                </li>
              )}
              <li>
                {utils.uniqueByProperty(userReducer?.history , "code").length > 4 && <button onClick={()=>{
                  setShowMore(item => !item)
                }} className={`dark:text-white ${showMore ? "hidden" : "flex"} flex-row items-center gap-2 text-[14px]`}><ChosenIcon e='three-dots'/>See more</button>}
              </li>
            </ul> */}
          </nav>
          <nav className='w-[80%] flex flex-col items-center gap-3 h-[20vh] justify-center fixed bottom-0'>
            <button className='flex items-center flex-row gap-2 border-2 px-4 rounded-[30px] p-3 border-slate-950 dark:border-slate-100 bg-none dark:text-white'>
              <GiUpgrade/>
              <span>Upgrade plan</span>
            </button>
            <div className='flex flex-row justify-between items-center w-full'>
              <div className='flex flex-row items-center gap-2'>
                <img src="/guest-user.webp" alt="Guest User" className="w-12 h-12 rounded-full"/>
                <div className='flex flex-col'>
                  <h4 className='dark:text-white'>Guest</h4>
                  <p className='text-slate-400 text-[13px]'>Free plan</p>
                </div>
              </div>
              <div className='flex dark:text-white flex-row items-center gap-2'>
                <span>My Profile</span>
                <IoIosArrowForward/>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
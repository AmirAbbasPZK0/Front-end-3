"use client"

import { AnimatePresence, motion } from "framer-motion"
import { FaRegTrashAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import { FaTimes } from "react-icons/fa"
import { useEffect, useState } from "react";
import { useAppDispatch , useAppSelector } from "@/services/redux/store";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { updateData , insertToForm, removeFromCart } from "@/services/redux/reducers/templateSlice";

const EmailTemplateSlideBar = ({ setClose, isOpen }: { setClose: (value: boolean) => void, isOpen: boolean }) => {

  const [loading , setLoading] = useState(false)

  const dispatch = useAppDispatch()

  const data = useAppSelector(state => state.templateSlice.data)

  useEffect(()=>{
    setLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-all-emails` , {
        method : "GET",
        headers : {
            "Authorization" : `Bearer ${Cookies.get("access_token")}`
        }
    }).then(res => res.json())
    .then(data => {
        setLoading(false)
        dispatch(updateData(data?.data))
    })
  },[])
  
    return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-10 z-50"
            onClick={() => setClose(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="sidebar"
            initial={{ x: 400 }} // sidebar enters from the right
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex flex-col gap-4 p-3 pb-3 bg-white dark:bg-slate-900 fixed right-0 top-0 z-[2147483647] text-white w-[360px] h-[100vh]"
          >
            <div className='flex flex-row w-full justify-between'>
              <div className='flex flex-col'>
                <h3 className='rounded-md font-semibold text-[30px] dark:text-white text-black'>Templates</h3>
                <p className="text-slate-500">List Of Templates</p>
              </div>
              <button className="p-3 text-[20px]" onClick={() => setClose(false)}>
                <FaTimes className="text-black dark:text-white" />
              </button>
            </div>
            <hr className="w-full border-1 border-slate-900 dark:border-slate-100"/>
            <div className='flex flex-col h-[100vh] bg-white dark:bg-slate-900 w-full gap-4 overflow-auto'>
              <button onClick={()=> {
                dispatch(insertToForm({}))
                setClose(false)
              }} className="text-black flex items-center justify-between font-semibold dark:text-white dark:bg-slate-800 bg-slate-200 rounded-md p-3 w-full items-left text-left">
                <span>Default</span>
                <span className="p-2">
                  <IoReturnDownBackOutline className="text-[20px]"/>
                </span>
              </button>
              {data?.map((item : any , key : number) => (
                item?.name !== null && 
                <div className={`text-black flex items-center justify-between font-semibold dark:text-white ${template_background()} rounded-md p-3 w-full items-left text-left`} key={key}>
                  <button className="w-full text-left h-full" onClick={()=>{
                    setClose(false)
                    dispatch(insertToForm(item))
                  }}>
                  {item.name}  
                  </button>
                  <button className="p-2" onClick={()=>{
                    dispatch(removeFromCart(item.name))
                    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/generate-email/${item.id}` , {
                      method : "DELETE",
                      headers : {
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${Cookies.get("access_token")}`
                      }
                    }).then(res => {
                      if(res.ok){
                        return res.json()
                      }
                    })
                  }}><FaRegTrashAlt/></button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const template_background = () => {
  
  // let key = id % 6

  let key = Math.ceil(Math.random() * 5)

  switch(key){
    case 1:
      console.log(key)
      return "dark:bg-red-950 bg-red-300"
    case 2:
      console.log(key)
      return "dark:bg-blue-950 bg-blue-300"
    case 3:
      console.log(key)
      return "dark:bg-green-950 bg-green-300"
    case 4:
      console.log(key)
      return "dark:bg-yellow-950 bg-yellow-300"
    case 5:
      console.log(key)
      return "dark:bg-purple-950 bg-purple-300"
    default:
      return "dark:bg-slate-800 bg-slate-200"
  }
} 

export default EmailTemplateSlideBar;

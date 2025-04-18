"use client"
import { useState } from "react";
import { BiDislike , BiSolidLike , BiLike , BiSolidDislike } from "react-icons/bi";
import { AnimatePresence , motion } from "framer-motion"

const CommentSection = () => {

    const [status , setStatus] = useState<"None" | "Like" | "Dislike">("None")
    const [open , setOpen] = useState(false)

    const classStyle = "text-[20px]"

    const handleClose = () =>{
        setOpen(false)
        setStatus("None")
    }

    return (<>
        <div className="flex flex-row gap-2 items-center justify-center">
            <button type="button" className={classStyle} onClick={()=> {
                if(status === "Like"){
                    setStatus("None")
                    if(open){
                        setOpen(false)
                    }
                }else{
                    setStatus("Like")
                    if(open){
                        setOpen(false)
                    }
                }
            }}>
                {status == "Like" ? <BiSolidLike/> : <BiLike/>}
            </button>
            <button type="button" className={classStyle} onClick={()=> {
                if(status === "Dislike"){
                    setStatus("None")
                    setOpen(false)
                }else{
                    setStatus("Dislike")
                    setOpen(true)
                }
            }}>
                {status == "Dislike" ? <BiSolidDislike/> : <BiDislike/>}
            </button>
        </div>
        {open && <DislikeModal handleClose={handleClose}/>}
    </>);
}

function DislikeModal({handleClose} : {handleClose : () => void}){
    return(<>
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50"
                    onClick={handleClose}
                />
                <motion.form
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="relative w-full max-w-md dark:bg-slate-900 gap-2 text-center flex flex-col rounded-2xl bg-white p-8 shadow-xl"
                >
                    <h1 className="text-[30px]">Leave a Reply</h1>
                    <h1 className="text-[16px]">We would like to know about your opinion</h1>
                    <input type="email" className="p-2 rounded-md border-2 border-slate-500 bg-transparent dark:border-slate-100" placeholder="Email"/>
                    <textarea  className="p-2 rounded-md border-2 h-40 outline-none border-slate-500 bg-transparent dark:border-slate-100"></textarea>
                    <button className="p-2 rounded-md bg-blue-600 text-white " type="submit">Submit</button>
                </motion.form>
            </div>
        </AnimatePresence>
    </>)
}
 
export default CommentSection;
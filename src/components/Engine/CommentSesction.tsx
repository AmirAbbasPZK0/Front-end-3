"use client"

import { useState } from "react";
import { BiDislike , BiSolidLike , BiLike , BiSolidDislike } from "react-icons/bi";
import { AnimatePresence , motion } from "framer-motion"
import { IoAttachOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import { useEdgeStore } from '@/lib/edgestore';
import toast from "react-hot-toast";
import { useAppDispatch , useAppSelector } from "@/services/redux/store";
import { addUrl } from "@/services/redux/reducers/commentFileUploaderSlice";
import endpoints from "@/configs/endpoints";
import restApi from "@/services/restApi";


const CommentSection = ({message_id} : {message_id : number}) => {

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
        {open && <DislikeModal setStatus={setStatus} message_id={message_id} handleClose={handleClose}/>}
    </>);
}

function DislikeModal({handleClose , message_id , setStatus} : {handleClose : () => void , message_id : number , setStatus : (e : any) => void}){

    const [files, setFiles] = useState<File[]>([]);
    const [uploadedFiles , setUploadedFiles] = useState<File[]>([])
    const [uploadStatus, setUploadStatus] = useState(false);
    const {getInputProps, open} = useDropzone({noClick : true})
    const {edgestore} = useEdgeStore()
    const dispatch = useAppDispatch()
    const filesD = useAppSelector(state => state.commentFileUploaderSlice.uploadedFile)
    const user = useAppSelector(state => state.userSlice)
    

    const onSubmit = async (e : any) => {
        e.preventDefault()
        let body = {
            email : user?.isLogin ? user?.data?.email : e?.target?.email?.value,
            comment : e?.target?.comment?.value,
            rating : "negative",
            message_id
        }
        const restData = await restApi(endpoints.feedback , false , false).post(body)
        if(restData.code === 201){
            toast.success("Thanks for your Feedback!" , {
                duration : 2000
            })
            handleClose()
            setStatus("Dislike")
        }
    }


    return(<>
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50"
                    onClick={()=>{
                        handleClose()
                        setStatus("None")
                    }}
                />
                <motion.form
                    onSubmit={onSubmit}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="relative w-full max-w-md dark:bg-slate-900 gap-2 text-center flex flex-col rounded-2xl bg-white p-8 shadow-xl"
                >
                    <h1 className="text-[30px]">Leave a Comment</h1>
                    <h1 className="text-[16px]">We would like to know about your opinion</h1>
                    {!user.isLogin && <input name="email" type="email" className="p-2 rounded-md border-2 border-slate-500 bg-transparent dark:border-slate-100" placeholder="Email"/>}
                    <textarea name="comment" className="p-2 rounded-md border-2 h-40 outline-none border-slate-500 bg-transparent dark:border-slate-100"></textarea>
                    {/* <input {...getInputProps()} /> */}
                    {/* {filesD?.map((item , index) => (
                        <div key={index}>{item.name}</div>
                    ))} */}
                    {/* <button onClick={open} type="button" className="flex flex-row gap-1 items-center justify-start border-1 dark:border-slate-100 border-slate-900 p-2 rounded-md"><IoAttachOutline/><span>Attach File</span></button> */}
                    <button className="p-2 rounded-md bg-blue-600 text-white " type="submit">Submit</button>
                </motion.form>
            </div>
        </AnimatePresence>
    </>)
}
 
export default CommentSection;
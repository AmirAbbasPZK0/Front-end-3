"use client"

import { useEffect, useState } from "react";
import { BiDislike , BiSolidLike , BiLike , BiSolidDislike } from "react-icons/bi";
import { AnimatePresence , motion } from "framer-motion"
import { useEdgeStore } from '@/lib/edgestore';
import toast from "react-hot-toast";
import { useAppDispatch , useAppSelector } from "@/services/redux/store";
import endpoints from "@/configs/endpoints";
import restApi from "@/services/restApi";
import { addUrl , removeAllFiles, removeFile } from "@/services/redux/reducers/commentFileUploaderSlice";
import { FaRegTrashCan } from "react-icons/fa6";
import { LiaTimesSolid } from "react-icons/lia";

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
        {open && <DislikeModal setStatus={setStatus} handleClose={handleClose}/>}
    </>);
}

function DislikeModal({handleClose, setStatus} : {handleClose : () => void  , setStatus : (e : any) => void}){

    const uploadedFiles = useAppSelector(state => state.commentFileUploaderSlice.uploadedFiles)
    const urlOfUploadedFiles = useAppSelector(state => state.commentFileUploaderSlice.fileUrls)
    const [file , setFile] = useState<File>()
    const [uploadPending , setUploadPending] = useState(false)
    const {edgestore} = useEdgeStore()
    const dispatch = useAppDispatch()
    const [pending , setPending] = useState(false)


    const onSubmit = async (e : any) => {
        setPending(true)
        e.preventDefault()
        let body = {
            email :  e?.target?.email?.value,
            comment : e?.target?.comment?.value,
            rating : "negative",
            thread_code : window.location.href.split("/c/")[1],
            file_url : urlOfUploadedFiles
        }
        const restData = await restApi(endpoints.feedback , false , false).post(body)
        if(restData.code === 201){
            toast.success("Thanks for your Feedback!" , {
                duration : 2000
            })
            handleClose()
            setPending(false)
            setStatus("Dislike")
        }
        dispatch(removeAllFiles())
    }

    const uploadHandler = async () => {
        setUploadPending(true)
        if(file){
            const res = await edgestore.myFiles.upload({file})
            dispatch(addUrl({name : file.name , url : res.url}))
            console.log(uploadedFiles)
            setUploadPending(false)
        }
    } 

    useEffect(()=>{
        if(file){
            uploadHandler()
        }
    },[file])

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
                    <div className="flex flex-row w-full justify-end items-end">
                        <button onClick={handleClose}><LiaTimesSolid/></button>
                    </div>
                    <h1 className="text-[30px]">Leave a Comment</h1>
                    <h1 className="text-[16px]">We would like to know about your opinion</h1>
                    <input name="email" type="email" className="p-2 rounded-md border-2 border-slate-500 bg-transparent dark:border-slate-100" placeholder="Email (Optional)"/>
                    <textarea name="comment" placeholder="Comment" className="p-2 rounded-md border-2 h-40 outline-none border-slate-500 bg-transparent dark:border-slate-100"></textarea>
                    
                    <div className="w-full items-center">
                        <input required={false} onChange={e => setFile(e.target.files?.[0])} id="picture" type="file" className="flex h-10 w-full dark:border-slate-100 border-slate-500 border-2 rounded-md border-input dark:bg-slate-900 bg-white px-3 py-2 text-sm dark:text-slate-50 text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"/>
                    </div>
                    <div className="flex flex-col items-start text-start gap-3">
                        {uploadPending && <div>Pending...</div>}
                        {uploadedFiles?.map((item , key) => (
                            <div className="flex flex-row justify-between p-2 rounded-md border-2 w-full" key={key}>
                                {item.name.slice(0,10) + "..." + item.name.split(".")[item.name.split(".").length - 1]}
                                <button onClick={()=> dispatch(removeFile({name : item.name , url : item.url}))}><FaRegTrashCan/></button>
                            </div>
                        ))}
                    </div>
                    <button disabled={pending} className="p-2 rounded-md bg-blue-600 text-white" type="submit">{pending ? "Pending..." : "Submit"}</button>
                </motion.form>
            </div>
        </AnimatePresence>
    </>)
}
 
export default CommentSection;
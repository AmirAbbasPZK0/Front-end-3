"use client"
import { useState } from "react";
import { BiDislike , BiSolidLike , BiLike , BiSolidDislike } from "react-icons/bi";

const CommentSection = () => {

    const [status , setStatus] = useState<"None" | "Like" | "Dislike">("None")
    const [open , setOpen] = useState(false)

    const classStyle = "text-[20px]"

    const handleClose = () =>{
        setOpen(false)
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

function DislikeModal({} : {handleClose : () => void}){
    return(<>
        <div className="flex flex-row gap-1 items-center justify-center">
            <input className="p-2 rounded-md border-2 border-slate-200" placeholder="What is your comment about this answer" type="text" />
            <button type="button"></button>
        </div>
    </>)
}
 
export default CommentSection;
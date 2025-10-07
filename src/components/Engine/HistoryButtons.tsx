"use client"

import useWebSocket from "@/hooks/useWebSocket";
import { useAppDispatch , useAppSelector } from "@/services/redux/store";
import { setCounterToPayload , checkHistory} from "@/services/redux/reducers/newThreadSlice";
import { removeRecency } from "@/services/redux/reducers/resourceSlice";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import TooltipMenu from "./TooltipMenu";
import { TiTick } from "react-icons/ti";
import Cookies from "js-cookie";
import { editHistory } from "@/services/redux/reducers/userSlice";
import toast from "react-hot-toast";

const HistoryButtons = ({item , onClose} : {item : any , onClose : ()=> void}) => {

    const router = useRouter()
    const {setResponse} = useWebSocket()
    const counter = useAppSelector(state => state.newThreadSlice.counter)
    const dispatch = useAppDispatch()
    const [renameForm , setRenameForm] = useState(false)

    const onEditSubmit = (e : ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if(e.target?.titleD?.value.length < 3){
            toast.error("You should enter at least 3 Character")
            return false
        }
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/history/${item?.code}` , {
            method : "PUT",
            headers : {
                "Authorization" : `Bearer ${Cookies.get("access_token")}`,
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({title : e.target?.titleD?.value})
        }).then(res => {
            if(res.ok){
                return res.json()
            }
        }).then(() => {
            console.log("Deleted Successfully")
        })
        setRenameForm(false)
        dispatch(editHistory({code : item?.code , title : e.target?.titleD?.value}))
    }

    return (<>
        <div className='text-left flex items-center flex-row justify-between rounded-md dark:bg-slate-600 bg-slate-100 w-full hover:bg-slate-200 dark:hover:bg-slate-500 transition-colors duration-200 group'>
            {renameForm ? (<>
                <form onSubmit={onEditSubmit} className="flex w-2 gap-2" action="">
                    <div className="flex-1 p-2">
                        <input name="titleD" type="text" defaultValue={item?.title} />
                    </div>
                    <button><TiTick/></button>
                </form>
            </>) : (<>
                <p onClick={()=>{
                    if(window.location.href.split("/c/")[1] !== item?.code){
                        setResponse({})
                        router.push(`/c/${item?.code}`)
                        dispatch(checkHistory(true))
                        dispatch(removeRecency())
                        dispatch(setCounterToPayload(item?.conversation?.[item?.conversation?.length - 1]?.id + 1))
                        localStorage.setItem("counter" , `${counter}`)
                        onClose()
                    }
                }} className="text-[12px] p-2 w-full cursor-pointer font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">{item?.title.length > 30 ? `${item?.title.slice(0,30)} ...` : item?.title}</p>
                </>)}
            
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <TooltipMenu handleRenameForm={()=> setRenameForm(item => !item)} id={item?.code}/>
            </div>
        </div>
    </>);
}
 
export default HistoryButtons;
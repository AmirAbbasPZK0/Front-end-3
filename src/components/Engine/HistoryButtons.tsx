"use client"

import useWebSocket from "@/hooks/useWebSocket";
import { useAppDispatch , useAppSelector } from "@/services/redux/store";
import { setCounterToZero , checkHistory} from "@/services/redux/reducers/newThreadSlice";
import { removeRecency } from "@/services/redux/reducers/resourceSlice";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import TooltipMenu from "./TooltipMenu";
import { TiTick } from "react-icons/ti";
import Cookies from "js-cookie";
import { editHistory } from "@/services/redux/reducers/userSlice";

const HistoryButtons = ({item , onClose} : {item : any , onClose : ()=> void}) => {

    const router = useRouter()
    const {setResponse} = useWebSocket()
    const counter = useAppSelector(state => state.newThreadSlice.counter)
    const dispatch = useAppDispatch()
    const [renameForm , setRenameForm] = useState(false)

    const onEditSubmit = (e : ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        let data = {
            title : e.target?.titleD?.value
        }
        if(data.title === ""){
            return false
        }
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/history/${item?.code}` , {
            method : "PUT",
            headers : {
                "Authorization" : `Bearer ${Cookies.get("access_token")}`,
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        }).then(res => {
            if(res.ok){
                return res.json()
            }
        }).then(() => {
            console.log("Deleted Successfully")
        })
        setRenameForm(false)
        dispatch(editHistory({code : item?.code , title : data.title}))
    }

    return (<>
        <div className='text-left p-2 flex items-center flex-row justify-between rounded-md dark:bg-slate-600 bg-slate-100 w-full'>
            {renameForm ? (<>
                <form onSubmit={onEditSubmit} className="flex w-2 gap-2" action="">
                    <input name="titleD" type="text" defaultValue={item?.title} />
                    <button><TiTick/></button>
                </form>
            </>) : (<>
                <p onClick={()=>{
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
                }} className="text-[12px] w-full cursor-pointer font-semibold">{item?.title.length > 30 ? `${item?.title.slice(0,30)} ...` : item?.title}</p>
                </>)}
            
            <TooltipMenu handleRenameForm={()=> setRenameForm(item => !item)} id={item?.code}/>
        </div>
    </>);
}
 
export default HistoryButtons;
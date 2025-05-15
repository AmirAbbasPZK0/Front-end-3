"use client"

import { useState } from "react";
import { LuPencil } from "react-icons/lu";
import { FaTimes } from "react-icons/fa";
import useWebSocket from "@/hooks/useWebSocket";

const PromptEditSection = ({query , id} : {query : string, id : number | string}) => {

    const {setResponse , response} = useWebSocket()
    const [showEdit , setShowEdit] = useState(false)
    const [ableForm , setAbleForm] = useState(false)

    const handleResponse = () => {
        console.log("D")
        // setResponse((prev : any) => {
        //     const cp = {...prev}
        //     cp[id] = {
        //         question : query,
        //         text: 'demo',
        //         isLoading: false,
        //         isDone : false,
        //         images: [],
        //         data: null,
        //         videos : [],
        //         findoraMessage : "",
        //         relatedQuestions: []
        //     }

        //     return cp
        // })
    }

    return (<>
        <div onMouseLeave={()=> setShowEdit(false)} onMouseOver={()=> setShowEdit(true)} className="dark:bg-[#202938] flex flex-row justify-end text-end shadow-md items-end bg-white rounded-b-3xl rounded-tl-3xl p-2">
            <h2 className="text-[15px] flex flex-row-reverse items-start gap-2 justify-start text-start p-2 font-semibold">{!ableForm && query}{(showEdit || ableForm) && <button onClick={()=> {
                setAbleForm(item => !item)
                handleResponse()
            }}>{ableForm ? <FaTimes/> : <LuPencil/>}</button>}</h2>
            {ableForm && <input className="border-none p-1 outline-none" defaultValue={query}/>}
        </div>
    </>);
}
 
export default PromptEditSection;
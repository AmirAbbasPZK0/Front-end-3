"use client"

import { ChangeEvent, useState } from "react";
import { LuPencil } from "react-icons/lu";
import { FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import useWebSocket from "@/hooks/useWebSocket";
import { BsCheckLg } from "react-icons/bs";


const PromptEditSection = ({query , id , coreId} : {query : string, id : number | string , coreId : number}) => {

    const {setResponse , socket} = useWebSocket()
    const [showEdit , setShowEdit] = useState(false)
    const [ableForm , setAbleForm] = useState(false)
    const [editMessage , setEditMessage] = useState(query)
    const pathname = usePathname()

    const handleResponse = (e : ChangeEvent<HTMLFormElement>) => {

        e.preventDefault()

        setEditMessage(e?.target?.query?.value)

        localStorage.setItem('counter' , `${coreId}`);

        const newResponses: any = {};

        newResponses[coreId] = {
            text: "",
            question : e.target?.query?.value,
            isLoading: true,
            isDone : false,
            images: [],
            data: null,
            videos : [],
            findoraMessage : "",
            relatedQuestions: [],
            sources : []
        };

        setResponse((prev: any) => ({ ...prev, ...newResponses }));

        socket?.emit("edit_message" , {
            thread_code : pathname.split('/c/')[1],
            message_index : id,
            new_question : e.target?.query?.value,
        })

    }

    return (<>
        <form onSubmit={handleResponse} onMouseLeave={()=> setShowEdit(false)} onMouseOver={()=> setShowEdit(true)} className="dark:bg-[#202938] flex flex-row justify-end text-end shadow-md items-end bg-white rounded-b-3xl rounded-tl-3xl p-2">
            <h2 className="text-[15px] flex flex-row-reverse items-start gap-2 justify-start text-start p-2 font-semibold">{!ableForm && editMessage}{(showEdit || ableForm) && <button type="button" onClick={()=> {
                setAbleForm(item => !item)
            }}>{ableForm ? <FaTimes/> : <LuPencil/>}</button>}</h2>
            {ableForm && <input name="query" className="border-none p-1 outline-none" defaultValue={editMessage}/>}
            {ableForm && <button type="submit" className="p-2"><BsCheckLg/></button>}
        </form>
    </>);
}
 
export default PromptEditSection;
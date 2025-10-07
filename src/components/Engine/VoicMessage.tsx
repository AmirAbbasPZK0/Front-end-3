"use client"

import { useState } from "react";
import { MdOutlineKeyboardVoice, MdKeyboardVoice } from "react-icons/md";

const VoiceMessage = () => {

    const [isActive , setIsActive] = useState(false)

    return (<>
        <button onClick={()=>{
            setIsActive(item => !item)
        }}>
            {!isActive ? <MdOutlineKeyboardVoice className="text-[24px]"/> : <MdKeyboardVoice className="text-[24px]"/>}
        </button>
    </>);
}
 
export default VoiceMessage;
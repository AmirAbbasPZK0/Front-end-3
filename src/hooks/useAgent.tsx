"use client"
import { useState , useEffect } from "react";

const useAgent = (width = 600) => {

    const [isMobile , setIsMobile] = useState(false)

    useEffect(()=>{
        window.addEventListener("resize" , ()=>{
            setIsMobile(window.innerWidth < width)
        })
    },[width])

    return {isMobile}
}
 
export default useAgent;
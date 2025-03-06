"use client"
import { useState , useEffect } from "react";

const useAgent = (width = 600) => {

    const [isMobile , setIsMobile] = useState(false)

    const handleSize = ()=> {
        setIsMobile(window.innerWidth < width)
    }

    useEffect(()=>{
        
        window.addEventListener("resize" , handleSize)

        return () => window.removeEventListener("resize" , handleSize)

    },[width])

    return {isMobile}
}
 
export default useAgent;
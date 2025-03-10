"use client"

import { ReactNode, useEffect } from "react"
import useAsync from "@/hooks/useAsync"
import Cookies from "js-cookie"

import WebSocketProvider from "@/contexts/WebSocketContext"

const Layout = ({children} : {children : ReactNode}) => {

    const {isPending , run} = useAsync("GET" , "user")

    useEffect(()=>{
        if(Cookies.get("jwt_token") !== undefined){
            run(null , Cookies.get("jwt_token"))?.then(data => {
                console.log(data)
            })
        }
    }, [])

    return(<>
        <WebSocketProvider>
            {children}
        </WebSocketProvider>
    </>)
}

export default Layout
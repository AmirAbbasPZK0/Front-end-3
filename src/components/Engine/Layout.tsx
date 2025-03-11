"use client"

import { ReactNode, useEffect } from "react"
import useAsync from "@/hooks/useAsync"
import Cookies from "js-cookie"
import WebSocketProvider from "@/contexts/WebSocketContext"
import restApi from "@/services/restApi"
import endpoints from "@/configs/endpoints"
import { useAppDispatch } from "@/services/redux/store"
import { loginHandler } from "@/services/redux/reducers/userSlice"
import { useState } from "react"
import Loading from "./Loading"

const Layout = ({children} : {children : ReactNode}) => {

  const [isLoading , setIsLoading] = useState(true)

    const dispatch = useAppDispatch()

    const initialApiCalls = async () => {
      if (Cookies.get('access_token') || localStorage.getItem('sessionId')){
        const res = await restApi(endpoints.user, true, true).get();
        console.log(res)
        if(res.code === 200){
          dispatch(loginHandler(res.data))
        }
        setIsLoading(false)
      }else{
        setIsLoading(false)
      }
    };
    
    useEffect(() => {
      initialApiCalls()
    }, []);

    if(isLoading){
      return <div className="h-[100vh] flex items-center justify-center">
        <Loading/>
      </div>
    }

    return(<>
        <WebSocketProvider>
            {children}
        </WebSocketProvider>
    </>)
}

export default Layout
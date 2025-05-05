"use client"

import { ReactNode, useEffect } from "react"
import Cookies from "js-cookie"
import WebSocketProvider from "@/contexts/WebSocketContext"
import restApi from "@/services/restApi"
import endpoints from "@/configs/endpoints"
import { useAppDispatch , useAppSelector } from "@/services/redux/store"
import { historyHandler, loginHandler } from "@/services/redux/reducers/userSlice"
import { useState } from "react"
import Loading from "./Loading"


const Layout = ({children} : {children : ReactNode}) => {

  const [isLoading , setIsLoading] = useState(true)
  
  const isGenerating = useAppSelector(state => state.newThreadSlice.isAllowed)

  const isLogin = useAppSelector(state => state.userSlice.isLogin)

  const dispatch = useAppDispatch()

  const initialApiCallsH = async () => {
      if (Cookies.get("access_token")){
        const res = await restApi(endpoints.history , true , true).get();
        dispatch(historyHandler(res.data))
        if(res.code === 200){
          localStorage.setItem("history" , JSON.stringify(res.data))
        }
      }
    };

    const initialApiCalls = async () => {

      if (Cookies.get('access_token') || localStorage.getItem('sessionId')){
        const res = await restApi(endpoints.user, true, true).get();
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
    }, [initialApiCalls]);

    useEffect(()=>{
      initialApiCallsH()
    },[initialApiCallsH , isGenerating , isLogin])

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
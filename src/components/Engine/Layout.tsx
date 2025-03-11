"use client"

import { ReactNode, useEffect } from "react"
import useAsync from "@/hooks/useAsync"
import Cookies from "js-cookie"
import WebSocketProvider from "@/contexts/WebSocketContext"
import restApi from "@/services/restApi"
import endpoints from "@/configs/endpoints"
import { useAppDispatch } from "@/services/redux/store"
import { loginHandler } from "@/services/redux/reducers/userSlice"


const Layout = ({children} : {children : ReactNode}) => {

    const dispatch = useAppDispatch()
    const initialApiCalls = async () => {
        if (Cookies.get('access_token') || localStorage.getItem('sessionId')){
          const res = await restApi(endpoints.user, true, true).get();
          dispatch(loginHandler(res.data))
        }
      };
    
      useEffect(() => {
        initialApiCalls()
      }, []);

    return(<>
        <WebSocketProvider>
            {children}
        </WebSocketProvider>
    </>)
}

export default Layout
"use client"

import { ReactNode, useEffect } from "react"
import Cookies from "js-cookie"
import WebSocketProvider from "@/contexts/WebSocketContext"
import restApi from "@/services/restApi"
import endpoints from "@/configs/endpoints"
import { useAppDispatch } from "@/services/redux/store"
import { loginHandler } from "@/services/redux/reducers/userSlice"
import { useState } from "react"
import Loading from "./Loading"
import { useSession } from "next-auth/react"

const Layout = ({children} : {children : ReactNode}) => {

  const {data : session} = useSession()

  const [isLoading , setIsLoading] = useState(true)

    const dispatch = useAppDispatch()

    const initialApiCalls = async () => {

      // const token = Cookies.get("access_token")

      // try{
      //   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user` , {
      //     method : "GET",
      //     headers : {
      //       "Authorization" : `Bearer ${token}`
      //     }
      //   })
      //   const data = await res.json()
      //   console.log(data)
      // }catch(err){
      //   console.log(err)
      // }finally{
      //   setIsLoading(false)
      // }

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
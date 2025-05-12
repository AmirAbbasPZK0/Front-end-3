"use client"

import { ReactNode, useEffect, useCallback, useState } from "react"
import Cookies from "js-cookie"
import WebSocketProvider from "@/contexts/WebSocketContext"
import restApi from "@/services/restApi"
import endpoints from "@/configs/endpoints"
import { useAppDispatch } from "@/services/redux/store"
import { historyHandler, loginHandler } from "@/services/redux/reducers/userSlice"
import Loading from "./Loading"
import { useSession } from "next-auth/react"

const MAX_HISTORY_ITEMS = 50

const Layout = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true)

  const {data} = useSession()

  const dispatch = useAppDispatch()

  const fetchUserData = useCallback(async () => {
    const hasToken = Cookies.get("access_token") || localStorage.getItem("sessionId")
    if (!hasToken) {
      setIsLoading(false)
      return
    }

    const start = performance.now()
    try {
      const res = await restApi(endpoints.user, true, true).get()
      const time = performance.now() - start
      console.log(`User data fetch took ${Math.round(time)}ms`)

      if (res.code === 200) {
        dispatch(loginHandler(res.data))
      }
    } catch (err) {
      console.error("User fetch failed", err)
    } finally {
      setIsLoading(false)
    }
  }, [dispatch])

  const fetchUserHistory = useCallback(async () => {
    const token = Cookies.get("access_token")
    if (!token) return

    const start = performance.now()
    try {
      const res = await restApi(endpoints.history, true, true).get()
      const time = performance.now() - start
      console.log(`History fetch took ${Math.round(time)}ms`)

      if (res.code === 200) {
        const history = res.data.slice(0, MAX_HISTORY_ITEMS)
        dispatch(historyHandler(history))

        // Defer localStorage write
        setTimeout(() => {
          try {
            localStorage.setItem("history", JSON.stringify(history))
          } catch (e) {
            console.warn("localStorage write failed", e)
          }
        }, 0)
      }
    } catch (err) {
      console.error("History fetch failed", err)
    }
  }, [dispatch])

  useEffect(() => {
    if(data?.user?.email !== undefined){
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/google/auth` , {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({email : data?.user?.email})
      }).then(res => {
        if(res.ok){
          return res.json()
        }
      }).then(data => {
        Cookies.set("access_token" , data?.data?.jwt , {expires : 1})
      })
    }
  }, [data?.user?.email])

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  useEffect(() => {
    fetchUserHistory()
  }, [fetchUserHistory])

  if (isLoading) {
    return (
      <div className="h-[100vh] flex items-center justify-center">
        <Loading />
      </div>
    )
  }

  return (
    <WebSocketProvider>
      {children}
    </WebSocketProvider>
  )
}

export default Layout

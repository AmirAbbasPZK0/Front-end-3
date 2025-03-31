"use client"

import { useState } from "react"

export const useAsync = (category : string , method : "GET" = "GET") => {

    const [isLoading , setIsLoading] = useState(false)
    
    const BASE_URL = `https://gnews.io/api/v4/top-headlines?country=us&topic=${category}&token=293d2bd1fc8c70aecf7dd2f0b3e61350`

    function run(){
        setIsLoading(true)
        return new Promise((resolve , reject)=> {
            fetch(BASE_URL).then(res => {
                if(res.ok){
                    return res.json()
                }else{
                    throw new Error("Failed to Fetch")
                }
            }).then(data => {
                resolve(data)
            }).catch(err => {
                reject(err)
            }).finally(()=> setIsLoading(false))
        })
    }

    return {run , isLoading}

}
import { useState } from "react"

type Methods = "POST" | "GET" | "PUT" | "DELETE"

const useAsync = (method : Methods , url : string) => {
    
    const [isPending , setIsPending] = useState(false)

    const mainUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${url}`

    const run = (body : any = null , token : any = null) => {
        setIsPending(true)
        switch(method){
            case "GET":
                return new Promise((resolve , reject) => {
                    fetch(mainUrl , {
                        method,
                        headers : {
                            "Content-Type" : "application/json",
                            "Authorization" : `Bearer ${token}`
                        },
                        mode : "cors"
                    }).then(res => {
                        if(!res.ok){
                            throw new Error("Failed to Fetch")
                        }
                    }).then(data => {
                        resolve(data)
                    })
                    .catch(err => reject(err))
                    .finally(()=> setIsPending(false))
                })
            case "POST":
                return new Promise((resolve , reject) => {
                    fetch(mainUrl , {
                        method,
                        headers : {
                            "Content-Type" : "application/json",
                        },
                        body : JSON.stringify(body)
                    }).then(res => {
                        if(!res.ok){
                            throw new Error("Failed to Fetch")
                        }
                    }).then(data => {
                        resolve(data)
                    }).catch(err => {
                        reject(err)
                    }).finally(()=> setIsPending(false))
                })
        }
    }


    return {isPending , run}

}

export default useAsync
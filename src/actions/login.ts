"use server"
import { cookies } from "next/headers"

export async function login(prevent : any , formData : FormData){
    const data = {
        email : formData.get("email"),
        password : formData.get("password")
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login` as string , {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    })
    
    const result = await res.json();

    console.log(result);

    if(result.code !== 200){
        return {
            message : "Failed to Fetch"
        }
    }

    (await cookies()).set("jwt_token" , result?.data?.token , {path :"/" , maxAge :  60 * 60 * 60 * 24})

}
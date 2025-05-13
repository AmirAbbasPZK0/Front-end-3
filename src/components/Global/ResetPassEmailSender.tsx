"use client"

import { ChangeEvent, useState } from "react";

const ResetPassEmailSender = () => {
    
    const [isPending , setPending] = useState(false)

    const onSubmit = (e : ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        let data = {
            email : e.target.email.value
        }
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/request/` , {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        }).then(res => {
            if(res.ok){
                return res.json()
            }
        }).then(data => {
            console.log(data)
        }).catch(err => {
            console.log(err)
        })
    }
    
    return (<>
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col rounded-md shadow-md gap-3 bg-white p-6">
                <div className="">
                    <h1 className="text-[30px]">Send your Email</h1>
                    <p>If you signed in before, the reset pass will send to you</p>
                </div>
                <form onSubmit={onSubmit} className="flex flex-col gap-2 ">
                    <input name="email" placeholder="Enter Your Email" type="email" className="rounded-md outline-none border-2 p-2"/>
                    <button type="submit" className="p-2 rounded-md bg-blue-600 transition hover:bg-blue-950 text-white">Submit</button>
                </form>
            </div>
        </div>
    </>);
}
 
export default ResetPassEmailSender;
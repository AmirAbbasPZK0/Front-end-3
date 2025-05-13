'use client';

import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import toast from "react-hot-toast";

export default function ResetPass() {

  const router = useRouter()

  let token = window.location.href.split('/reset-password/')[1]

  const onSubmit = (e : ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    let data = {
      new_password : e.target.password?.value,
      token
    }
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/confirm/` , {
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
        toast.success(data?.msg , {
          duration : 1200
        })
        router.push("/")
    }).catch(err => {
        console.log(err)
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col rounded-md shadow-md gap-5 bg-white p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-[30px]">Change Your Password</h1>
          <p>After changing the password this code will be expired</p>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-2 ">
          <input name="password" placeholder="New Password" type="password" className="rounded-md outline-none border-2 p-2"/>
          <button type="submit" className="p-2 rounded-md bg-blue-600 transition hover:bg-blue-950 text-white">Submit</button>
        </form>
      </div>
    </div>
  );
}

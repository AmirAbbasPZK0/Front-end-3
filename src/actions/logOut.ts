"use server"

import { signOut } from "@/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function logOut(){

    // cookies().delete("authjs.callback-url")
    // cookies().delete("authjs.csrf-token")
    // cookies().delete("authjs.session-token")
    
    await signOut()

    redirect("/")

}
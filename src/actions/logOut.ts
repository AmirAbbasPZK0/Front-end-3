"use server"

import { signOut } from "@/auth"
import { cookies } from "next/headers"

export async function logOut(){

    (await cookies()).delete("authjs.callback-url")
    ;(await cookies()).delete("authjs.csrf-token")
    ;(await cookies()).delete("authjs.session-token")
    
    await signOut()

}
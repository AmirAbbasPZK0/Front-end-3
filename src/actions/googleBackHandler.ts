"use server"

import { auth } from "@/auth"

export async function googleBackHandler(){
    const session = await auth()
    
    return session?.user?.email
}
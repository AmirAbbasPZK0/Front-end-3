"use server"

import { signIn } from "@/auth"

export async function signUp(){

    await signIn("google")
    
}
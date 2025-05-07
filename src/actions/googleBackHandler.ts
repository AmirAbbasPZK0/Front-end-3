"use server"

import { auth } from "@/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function googleBackHandler() {
    const session = await auth()
    console.log(session)

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/google/auth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: session?.user?.email }),
        })

        if (res.ok) {
            const data = await res.json()
            const token = data?.data?.jwt

            // ✅ Set cookie correctly
            cookies().set("access_token", token, {
                path: "/",
                maxAge: 60 * 60 * 24, // 1 day in seconds
                // httpOnly: true, // consider setting this for security
                // secure: process.env.NODE_ENV === "production",
            })
        }
    } catch (err) {
        console.error("Error during fetch:", err)
    }

    redirect("/")
}

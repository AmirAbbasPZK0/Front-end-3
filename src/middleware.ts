import { NextResponse , NextRequest } from "next/server";


const publicRoutes = ["/login" , "/signup"]
const privateRoutes = ["/private"]

export async function middleware(req : NextRequest){

    const google_token = req.cookies.get("authjs.session-token")?.value

    const token = req.cookies.get("access_token")?.value

    const isInPrivateRoute = privateRoutes.includes(req.nextUrl.pathname)
    const isInPublicRoute = publicRoutes.includes(req.nextUrl.pathname)

    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user` , {
    //     method : "GET",
    //     headers : {
    //         "Authorization" : `Bearer ${token}`
    //     }
    // })

    // let user : {data : any} = {data : false}

    // if(res.ok){
    //     user = await res.json()
    // }

    // if(isInPrivateRoute && (!user.data || !google_token)){
    //     return NextResponse.redirect(new URL('/login' , req.nextUrl))
    // }

    // if(isInPublicRoute && (user.data || google_token)){
    //     return NextResponse.redirect(new URL('/' , req.nextUrl))
    // }

    return NextResponse.next()
}
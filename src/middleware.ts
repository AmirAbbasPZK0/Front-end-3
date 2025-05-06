import { NextResponse , NextRequest } from "next/server";


const publicRoutes = ["/login" , "/signup"]
const privateRoutes = ["/private"]

export async function middleware(req : NextRequest){

    // const google_token = req.cookies.get("authjs.session-token")?.value

    // const access_token = req.cookies.get("access_token")?.value

    // const isInPrivateRoute = privateRoutes.includes(req.nextUrl.pathname)
    // const isInPublicRoute = publicRoutes.includes(req.nextUrl.pathname)

    // if(isInPrivateRoute && !access_token){
    //     return NextResponse.redirect(new URL('/login' , req.nextUrl))
    // }

    // if(isInPublicRoute && access_token){
    //     return NextResponse.redirect(new URL('/' , req.nextUrl))
    // }

    return NextResponse.next()
}
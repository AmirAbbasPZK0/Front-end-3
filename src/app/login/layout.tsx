import { Metadata } from "next";
import { ReactNode } from "react";


export const metadata : Metadata = {
    title : "Login",
    description : "Login Page"
}

const Layout = ({children} : {children : ReactNode}) => {
    return (<>
        {children}
    </>);
}
 
export default Layout;
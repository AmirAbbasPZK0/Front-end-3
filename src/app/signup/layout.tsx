import { Metadata } from "next";
import { ReactNode } from "react";


export const metadata : Metadata = {
    title : "Sign Up",
    description : "Sign Up Page"
}

const Layout = ({children} : {children : ReactNode}) => {
    return (<>
        {children}
    </>);
}
 
export default Layout;
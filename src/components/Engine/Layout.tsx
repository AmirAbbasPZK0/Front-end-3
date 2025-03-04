import { ReactNode } from "react"

import WebSocketProvider from "@/contexts/WebSocketContext"

const Layout = ({children} : {children : ReactNode}) => {
    return(<>
        <WebSocketProvider>
            {children}
        </WebSocketProvider>
    </>)
}

export default Layout
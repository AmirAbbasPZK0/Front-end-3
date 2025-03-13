"use client"

import useAgent from "@/hooks/useAgent"
import { ReactNode, useState } from "react"
// import ChosenIcon from "./ChosenIcon"


interface HyperLinkProps {
    children : ReactNode
    href : string
    data : string[]
}

const HyperLink = ({...props} : HyperLinkProps) => {

    const [isHovered , setIsHovered] = useState(false)
    const {isMobile} = useAgent()

    const icon = `https://www.google.com/s2/favicons?domain_url=https://${props.href?.split("/")[2]}`

    return (<>
        <a className={`bg-slate-100 my-1 rounded-md dark:bg-slate-600 dark:text-white p-1 mx-2`}target="_blank" href={props.href}>
            {props.children}{isMobile && <br/>}
        </a>
    </>);
}
 
export default HyperLink;
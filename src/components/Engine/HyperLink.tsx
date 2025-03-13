"use client"

import { ReactNode, useState } from "react"
// import ChosenIcon from "./ChosenIcon"


interface HyperLinkProps {
    children : ReactNode
    href : string
    data : string[]
}

const HyperLink = ({...props} : HyperLinkProps) => {

    const [isHovered , setIsHovered] = useState(false)

    const icon = `https://www.google.com/s2/favicons?domain_url=https://${props.href?.split("/")[2]}`

    return (<>
        <a className='dark:text-slate-300  hover:bg-slate-200 text-slate-900 shadow-md pl-2 pr-2 bg-slate-100 dark:bg-slate-700 rounded-lg p-[2px]' onMouseLeave={()=> setIsHovered(false)} onMouseOver={()=> setIsHovered(true)} target="_blank" href={props.href}>
            {props.children}
            {/* <img src={icon} alt="" /> */}
        </a>
    </>);
}
 
export default HyperLink;
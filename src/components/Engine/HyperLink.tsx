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
        <a className='dark:text-slate-300 relative hover:bg-slate-200 text-slate-900 shadow-md pl-2 pr-2 bg-slate-100 dark:bg-slate-700 rounded-lg p-[2px]' onMouseLeave={()=> setIsHovered(false)} onMouseOver={()=> setIsHovered(true)} target="_blank" href={props.href}>
            {props.children}
            {isHovered && (<div className={`absolute z-10 flex flex-col gap-2 left-[50%] bottom-[50%] mb-2 px-3 py-2 text-sm bg-slate-100 dark:text-white dark:bg-gray-900 rounded-lg shadow-lg`}>
                <div className="flex w-[300px] flex-row gap-2 items-center">
                    <img className="w-[20px] h-[20px]" src={icon} alt="" />
                    <h3 className="font-bold">{props.data?.[3]}</h3>
                </div>
                <div className="w-[300px]">
                    <p className="text-gray-500">{props.data?.[4]}</p>
                </div>
                <div className="w-[300px] flex items-end justify-end">
                    {/* <ChosenIcon className="text-green-500" e="badge-check"/> */}
                </div>
            </div>)}
        </a>
    </>);
}
 
export default HyperLink;
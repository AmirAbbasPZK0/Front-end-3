"use client"

import { ReactNode } from "react";
import { BiSolidBadgeCheck } from "react-icons/bi";

interface SourceProps {
    title : string | ReactNode
    data : {title : string , snippet : string , link : string}
}

const Source = ({title , data} : SourceProps) => {

    const icon = `https://www.google.com/s2/favicons?domain_url=https://${data.link?.split("/")[2]}`

    return (<>
        <a href={data.link} target="_blank" rel="noopener noreferrer" className="w-full rounded-md dark:border-slate-200 border-slate-800 border-2 p-3">
            <div className="text-black gap-3 w-full flex flex-row dark:text-white">
                <img className="rounded-full p-1" src={icon} alt={""} /><span className="text-black dark:text-white">{title}</span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100">{data.title}</h3>
            <p className="text-gray-500">{data.snippet?.length > 50 ? `${data.snippet?.slice(0,50)}...` : data.snippet} </p>
            <div className="flex w-full items-end justify-end">
               <BiSolidBadgeCheck className="text-green-500"/>
            </div>
        </a>
    </>);
}
 
export default Source;
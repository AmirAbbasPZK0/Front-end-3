"use client"

import { usePathname } from "next/navigation";
import PropmptYard from "../Engine/PromptYard";
import { useAppSelector } from "@/services/redux/store";

const SearchEngine = () => {

    const pathname = usePathname()
    
    const isNew = useAppSelector(state => state.resourceSlice.isNew)

    const user = useAppSelector(state => state.userSlice)

    return (<>
        <div className={`min-h-screen w-full flex flex-col items-center ${pathname.includes("c") ? "justify-start" : "justify-center"} dark:bg-[#111828]`}>
            {isNew && <div className="w-full flex items-center justify-center">
                {user.isLogin ? 
                <h3 className="text-[24px] md:text-[30px] md:font-light font-normal text-zinc-900 dark:text-slate-200 antialiased text-center">
                    Welcome back <span className="font-normal">{user.data?.first_name}</span> <br/>
                </h3> 
                : 
                <h3 className="text-[24px] md:text-[36px] md:font-light font-normal text-zinc-900 dark:text-slate-200 antialiased text-center">
                    Ask Me Anything
                </h3>}
            </div>}
            <PropmptYard/>
        </div>
    </>);
}
 
export default SearchEngine;
"use client"

import PropmptYard from "../Home/PromptYard";
import { useAppSelector } from "@/services/redux/store";

const SearchEngine = () => {
    
    const isNew = useAppSelector(state => state.resourceSlice.isNew)

    return (<>
        <div className="min-h-[80vh] w-full flex flex-col items-cneter justify-center dark:bg-[#111828]">
            {isNew && <div className="w-full flex items-center justify-center">
                <h3 className="text-[24px] md:text-[36px] md:font-light font-normal text-zinc-900 dark:text-slate-200 antialiased text-center">Ask me Anything</h3>
            </div>}
            <PropmptYard/>
        </div>
    </>);
}
 
export default SearchEngine;
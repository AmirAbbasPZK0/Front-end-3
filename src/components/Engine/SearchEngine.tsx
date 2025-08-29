"use client"

import PropmptYard from "../Engine/PromptYard";

const SearchEngine = () => {

    return (<>
        <div className={`min-h-screen w-full flex flex-col dark:bg-[#111828]`}>
            <PropmptYard/>
        </div>
    </>);
}
 
export default SearchEngine;
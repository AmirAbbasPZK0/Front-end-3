"use client"
import { useState } from "react"
import { LiaTimesSolid } from "react-icons/lia"
import Source from "./Source"
import SourceButton from "./SourceButton"

const FactCheckSourceList = ({sources} : {sources : Array<string[]>}) => {

    const [openSources , setOpenSources] = useState(false)

    return (<>
        {sources && <SourceButton sources={sources} onClick={()=> setOpenSources(true)} />}
        {openSources && <>
                            <div onClick={()=>{
                                setOpenSources(false)
                            }} className="fixed inset-0 bg-black bg-opacity-30 z-40"></div>
                                </>}
                                    <div className={`flex flex-col gap-4 p-3 bg-slate-200 dark:bg-slate-900 ${openSources ? 'translate-x-0' : 'translate-x-full'} transition-all duration-300 ease-in-out right-0 top-0 fixed flex-col z-50 dark:text-white w-[360px] h-[100vh]`}>
                                        <div className='flex flex-row w-full justify-between'>
                                                <div className='flex flex-col'>
                                                    <h3 className='text-slate-900 dark:text-slate-100 font-semibold text-[30px]'>Sources</h3>
                                                    <p className='text-gray-500'>From {sources.length - 1} sources</p>
                                                </div>
                                                <button className="p-3 text-[20px]" onClick={()=>{
                                                    setOpenSources(false)
                                                }}><LiaTimesSolid/></button>
                                        </div>
                                            <div className='flex flex-col h-[100vh] bg-slate-200 dark:bg-slate-900 w-full gap-4 overflow-auto'>
                                                {sources?.map((source , key) => (
                                                    <li key={key} className="flex w-full p-2 items-start">
                                                        <Source data={{title : source[3] , snippet : source[4] , link : source[2] , verify : source[5]}} title={source[0]}/>
                                                    </li>
                                                ))}
                                            </div>
                                        </div>
                                
    </>);
}
 
export default FactCheckSourceList;
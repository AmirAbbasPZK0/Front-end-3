"use client"

import React , {useEffect, useState} from "react";
import ReactMarkdown from 'react-markdown';
import HyperLink from "./HyperLink";
import { hyperTextForMarkDown } from "@/functions/hypertext";
import { snippetAndTitleHandler } from "@/functions/snippetAndTitleHandler";
import Loading from "./Loading";
import Slider from "./Slider";
import { TbSend2 } from "react-icons/tb";
import { IoCopyOutline } from "react-icons/io5";
import Carousel from "./Carousel";

interface Source {
    title : string
    url : string
}

interface ResponseDisplayProps {
    response: string;
    sources: Source[];
    isLoading: boolean;
    images: any[];
    isDone : boolean;
    data: any
    relatedQuestions: any[],
    sendMessage: (prompt: string) => void;
    responseRef: any;
    query: string;
    videos: any[]
  }

const ResponseDisplay : React.FC<ResponseDisplayProps> = ({
    response ,
    sources ,
    isLoading , 
    images , 
    isDone , 
    data , 
    relatedQuestions , 
    sendMessage , 
    responseRef , 
    query ,
    videos
}) => {

    const isRTL = (text : string) => /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(text);

    const [hyperLinkTooltip , setHyperLinkTooltip] = useState<any>(null)
    const [text , setText] = useState("")
    const [disabled , setDisabled] = useState(false)

    useEffect(()=>{
        setHyperLinkTooltip(snippetAndTitleHandler(sources))
    },[sources])

    if(isLoading){
        return <div className="h-[70vh]">
            <Loading/>
        </div>
    }

    return(<>
        <div className="p-4 rounded-3xl gap-4 md:w-[80%] w-[100%] flex items-center flex-col">
            <div className="dark:bg-[#202938] bg-white shadow-md rounded-3xl w-full p-4">
                <h2 className="text-[25px] p-2 font-semibold">{query}</h2>
            </div>
            <div className="dark:bg-[#202938] bg-white shadow-md rounded-3xl p-4">
                <div className="flex gap-3 md:flex-row flex-col-reverse w-full  justify-between p-3 rounded-3xl">
                    <div className="flex flex-col w-[100%] md:w-[70%] gap-4">
                        <ReactMarkdown components={{
                            h1 : (props) => <h1 className='text-[26px] font-bold pt-4 pb-4' {...props}/>,
                            h2 : (props) => <h2 className='text-[23px] font-semibold pt-2 pb-2' {...props}/>,
                            h3 : (props) => <h3 className=' text-[20px] font-semibold pt-3' {...props}/>,
                            a : (props) => <HyperLink data={hyperLinkTooltip?.[props.href as string]} href={props.href as string}>{props.children}</HyperLink>,
                            ul : (props) => <ul {...props}/>,
                            li : (props) => <li {...props} className={`${isRTL(query) ?  "text-right rtl" : "text-left ltr"} p-2 flex gap-2`}><span>.</span><div>{props.children}</div></li>
                            }}> 
                            {sources ? hyperTextForMarkDown(response , sources) : response}
                        </ReactMarkdown>
                        <div className="flex flex-row">
                            <button><IoCopyOutline/></button>
                        </div>
                    </div>
                    <div className="md:w-[30%] w-full">
                        {images?.length > 0 && <Slider images={images}/>}
                    </div>
                </div>
            </div>
            {relatedQuestions?.length > 0 && (<>
                <div className="flex flex-col w-full dark:bg-[#202938] bg-white shadow-md rounded-3xl p-4">
                <h1 className="text-[20px] p-2 font-semibold">Related Questions</h1>
                <div className="flex flex-col w-full">
                        {Array.isArray(relatedQuestions) && relatedQuestions?.map((e, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                sendMessage(e);
                            }}
                            className={`border-b-2 w-[90%] border-slate-400 dark:border-slate-100 p-3 flex flex-row justify-between items-center`}
                        >
                            {isRTL(query) ? (<>
                            <p className="text-xs sm:text-sm text-right text-gray-600 dark:text-white">{e}</p>
                                </>) : (<>
                            <p className="text-xs sm:text-sm text-left text-gray-600 dark:text-white">{e}</p>
                            </>)}
                        </button>
                        ))}
                    </div>
                </div>
            </>)}
            {videos?.length > 0 && (<>
                <div className="flex flex-col w-full dark:bg-[#202938] bg-white shadow-md rounded-3xl p-4">
                <h1 className="text-[20px] p-2 font-semibold">Videos</h1>
                    <div className="w-full">
                        <Carousel videos={videos}/>
                    </div>
                </div>
            </>)}
            {!disabled && <div className="rounded-3xl bg-white dark:bg-[#202938] shadow-md md:w-[60%] w-[100%] p-3 flex flex-col">
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    sendMessage(text)
                    setDisabled(true)
                }} className="w-full flex flex-row gap-2" action="">
                    <input onChange={(e)=> setText(e.target.value)} type="text" placeholder="Follow-Up" className="w-full bg-transparent outline-none" />
                    {!disabled && <button disabled={disabled} className="rounded-full0 p-2"><TbSend2 className="text-[30px]"/></button>}
                </form>
            </div>}
        </div>
    </>)
}

export default ResponseDisplay
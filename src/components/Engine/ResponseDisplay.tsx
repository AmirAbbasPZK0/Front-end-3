"use client"

import React , {useEffect, useState} from "react";
import ReactMarkdown from 'react-markdown';
import HyperLink from "./HyperLink";
import { hyperTextForMarkDown } from "@/functions/hypertext";
import { snippetAndTitleHandler } from "@/functions/snippetAndTitleHandler";

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

    useEffect(()=>{
        setHyperLinkTooltip(snippetAndTitleHandler(sources))
    },[sources])

    return(<>
        <div className="p-4 rounded-3xl border-2 w-[80%] flex flex-col gap-2 border-slate-600 dark:border-slate-200">
            <div className="flex gap-3 flex-row w-full justify-between">
                <div>
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
                </div>
                <div className="w-[50%]">
                    <img className="max-w-[400px] min-w-[400px] max-h-[400px] min-h-[400px] object-cover rounded-md" src={images?.[0]?.imageUrl} alt="" />
                </div>
            </div>
            <div className="flex flex-col w-full">
                {relatedQuestions?.length > 0 && (<>
                    <h1 className="text-[20px] font-bold">Related Questions</h1>
                    <div className="flex flex-col w-full">
                        {Array.isArray(relatedQuestions) && relatedQuestions?.map((e, index) => (
                        <button
                            key={index}
                            onClick={() => {
                            // setPrompt(e.content);
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
                </>)}
            </div>
        </div>
    </>)
}

export default ResponseDisplay
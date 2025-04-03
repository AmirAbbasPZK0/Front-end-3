"use client"

import React , {RefObject, useEffect, useRef, useState} from "react";
import ReactMarkdown from 'react-markdown';
import HyperLink from "./HyperLink";
import { hyperTextForMarkDown } from "@/functions/hypertext";
import { snippetAndTitleHandler } from "@/functions/snippetAndTitleHandler";
import Loading from "./Loading";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula , materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'; // Choose a style
import { TbSend2 } from "react-icons/tb";
import { IoCopyOutline , IoCopy } from "react-icons/io5";
import CarouselYard from "./CarouselYard";
import FactCheckDisplay from "./FactCheckDisplay";
import Source from "./Source";
import { useAppSelector } from "@/services/redux/store";
import { FaTimes } from "react-icons/fa";
import { sourceList } from "@/functions/sourceList";
import SourceButton from "./SourceButton";
import useClipboard from "react-use-clipboard";
import remarkGfm from 'remark-gfm'
import NewSlider from "./NewSlider";
import { isRTL } from "@/functions/isRTL";


interface CodeComponentProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any; // For additional props
}


interface Video {
    title : string
    url : string
    source : string
    link : string
    date : string
    imageUrl : string
    imageHeight : string
    imageWidth : string
  }
  

type HandleImageType = {
    imageWidth : number
    imageHeight : number
    imageUrl : string
}

interface ClaimAnswerProps { 
    answer : {
        Reasoning : string
        Verdict : string
    },
    claim : string
}

interface DataProps {
    claim_1 ?: ClaimAnswerProps,
    claim_2 ?: ClaimAnswerProps,
    claim_3 ?: ClaimAnswerProps,
}

interface ResponseDisplayProps {
    response: string;
    sources: Array<Array<string>>;
    isLoading: boolean;
    images: HandleImageType[];
    isDone : boolean;
    data: {message : DataProps}
    relatedQuestions: string[],
    sendMessage: (prompt: string) => void;
    responseRef: string;
    query: string;
    videos: Video[]
    findoraMessage : string
}

interface HyperLink {
    [link : string] : string[]
}

const ResponseDisplay : React.FC<ResponseDisplayProps> = ({
    response ,
    sources ,
    isLoading , 
    images , 
    data , 
    relatedQuestions , 
    sendMessage ,
    findoraMessage,
    query ,
    isDone,
    videos
}) => {

    const [hyperLinkTooltip , setHyperLinkTooltip] = useState<HyperLink | null>(null)
    const [followUp , setFollowUp] = useState("")
    const [isSubmmited , setIsSubmited] = useState(false)
    const [openSources , setOpenSources] = useState(false)
    const CopyText = `${sources?.length > 0 ? `${removeMarkdown(response)} \n\n Sources \n\n ${sourceList(sources)}` : removeMarkdown(response)}`
    const [isCopied, setIsCopied] = useClipboard(CopyText);
    const selectedModule = useAppSelector(state => state.resourceSlice.selectedResource)
    const textareaRef : RefObject<HTMLTextAreaElement | null> = useRef(null)

    function removeMarkdown(markdown : string){
        return markdown.replace(/[*_`~#>]/g, "").replace(/\[(.*?)\]\(.*?\)/g, "$1");
    }

    useEffect(()=>{
        setHyperLinkTooltip(snippetAndTitleHandler(sources))
    },[sources])

    useEffect(() => {
        if(openSources){
            document.body.style.overflow = "hidden";
        }else{
            document.body.style.overflow = "auto";
        }
    }, [openSources]);

    useEffect(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
          textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [followUp]);

    if(isLoading){
        return <div className="h-[70vh]">
            <Loading/>
        </div>
    }

    if(data){
        return <FactCheckDisplay data={data?.message} sources={sources} query={query}/>
    }

    return(<>
        <div className={`p-4 ${openSources && "overflow-hidden"} rounded-3xl gap-4 md:w-[80%] w-[100%] flex items-end flex-col`}>
            <div className="dark:bg-[#202938] flex flex-row justify-end text-end items-end bg-white rounded-b-3xl rounded-tl-3xl p-2">
                <h2 className="text-[15px] flex items-end justify-end text-start p-2 font-semibold">{query}</h2>
            </div>
            {(findoraMessage !== "" && selectedModule === "medical") && 
            <div className="flex flex-col gap-2 w-full dark:bg-[#202938] bg-white shadow-md rounded-3xl p-4">
                <h2 className="text-2xl flex items-center bottom-0 font-bold dark:text-white">
              Find<img className='w-[14px] h-[14px] mt-1.5' src='/images/o.png' alt="/logo.png" />ra's Answer
            </h2>
                {findoraMessage}
            </div>}
            {response !== "" && 
            <div dir="auto" className="dark:bg-[#202938] bg-white w-full shadow-md rounded-3xl p-4">
                <div className="flex gap-3 md:flex-row flex-col-reverse w-full justify-between p-3 rounded-3xl">
                    <div className={`flex flex-col w-[100%] ${images?.length > 0 ? "md:w-[70%]" : "md:w-full"} gap-4`}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                            code({ node, inline, className, children, ...props } : CodeComponentProps) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                  <SyntaxHighlighter
                                    style={dracula} // You can replace this with any theme
                                    language={match[1]}
                                    PreTag="div" // Optional: Ensures compatibility with Next.js
                                    {...props}
                                  >
                                    {String(children).replace(/\n$/, '')} // Remove trailing newline
                                  </SyntaxHighlighter>
                                ) : (
                                  <code className={className} {...props}>
                                    {children}
                                  </code>
                                );
                              },
                            h1 : (props) => <h1 className='text-[26px] font-bold pt-4 pb-4' {...props}/>,
                            h2 : (props) => <h2 className='text-[23px] font-semibold pt-2 pb-2' {...props}/>,
                            h3 : (props) => <h3 className=' text-[20px] font-semibold pt-3' {...props}/>,
                            a : (props) => <HyperLink data={hyperLinkTooltip?.[props?.href as string]} href={props.href as string}>{props.children}</HyperLink>,
                            ul : (props) => <ul {...props}/>,
                            li : (props) => <li {...props} className={`${isRTL(query) ?  "text-right rtl" : "text-left ltr"} p-2 flex gap-2`}><span>.</span><div>{props.children}</div></li>
                        }}> 
                            {sources ? hyperTextForMarkDown(response , sources) : response}
                        </ReactMarkdown>
                        <div className="flex gap-2 flex-row">
                            {(sources && !(selectedModule === "file" || selectedModule === "url")) && <SourceButton sources={sources} onClick={()=>{
                                setOpenSources(true)
                            }}/>}
                            {openSources && <>
                                <div onClick={()=>{
                                    setOpenSources(false)
                                }} className="fixed inset-0 bg-black bg-opacity-30 z-40"/>
                            </>}
                            <div className={`flex flex-col gap-4 p-3 bg-slate-200 dark:bg-slate-900 ${openSources ? 'translate-x-0' : 'translate-x-full'} transition-all duration-300 ease-in-out right-0 top-0 fixed flex-col z-[2147483647] text-white w-[360px] h-[100vh]`}>
                                <div className='flex flex-row w-full justify-between'>
                                <div className='flex flex-col'>
                                    <h3 className='rounded-md font-semibold text-[30px] dark:text-white text-black'>Sources</h3>
                                    <p className='text-gray-500'>From {sources?.length - 1} sources</p>
                                </div>
                                <button className="p-3 text-[20px]" onClick={()=>{
                                    setOpenSources(false)
                                }}><FaTimes className="text-black dark:text-white"/></button>
                                </div>
                                <div className='flex flex-col h-[100vh] bg-slate-200 dark:bg-slate-900 w-full gap-4 overflow-auto'>
                                {sources?.map((source : string[], index : number) => (
                                    <li key={'source' + index} className="flex w-full p-2 items-start">
                                        <Source data={{title : source[3] , snippet : source[4] , link : source[2]}} title={source[0]}/>
                                    </li>
                                ))}
                                </div>
                            </div>
                            <button type="button" onClick={setIsCopied}>
                                {isCopied ? <IoCopy/> : <IoCopyOutline/>}
                            </button>
                        </div>
                    </div>
                    {(images && images?.length > 0) && <div className="md:w-[30%] w-full">
                        <NewSlider query={query} images={images}/>
                    </div>}
                </div>
            </div>}
            {(isDone) && (<>
                <CarouselYard videos={videos}/>
            </>)}
            {(relatedQuestions?.length > 0 && isDone) && (<>
                <div className="flex flex-col w-full dark:bg-[#202938] bg-white shadow-md rounded-3xl p-4">
                <h1 className="text-[20px] p-2 font-semibold">Related Questions</h1>
                <div className="flex flex-col w-full">
                        {Array.isArray(relatedQuestions) && relatedQuestions?.map((e, index) => (
                        <button
                        dir="auto"
                        onClick={()=> {
                            sendMessage(e)
                            setIsSubmited(true)
                        }}
                        type="button"
                        key={index}
                        className={`border-b-2 w-[90%] border-slate-400 dark:border-slate-100 p-3 flex flex-row justify-between items-center`}
                        >
                            {isRTL(query) ? (<>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-white">{e}</p>
                                </>) : (<>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-white">{e}</p>
                            </>)}
                        </button>
                        ))}
                    </div>
                </div>
            </>)}
            {!isSubmmited && (<>
                <div className="rounded-3xl bg-white dark:bg-[#202938] shadow-md w-[100%] p-3 flex flex-col">
                    <form onSubmit={(e)=>{
                        setIsSubmited(true)
                        e.preventDefault()
                        if(followUp !== ""){
                            sendMessage(followUp)
                        }
                    }} className="w-full flex flex-row gap-2" action="">
                        <textarea ref={textareaRef} dir="auto" value={followUp} className={`w-full ${isRTL(followUp) ? "text-right" : "text-left"} resize-none w-full min-h-2 h-full justify-center items-center flex overflow-hidden placeholder-gray-500 bg-transparent outline-none`} onChange={(e)=> setFollowUp(e.target.value)} placeholder="Follow-Up"></textarea>
                        <button className="rounded-full0 p-2"><TbSend2 className="text-[30px]"/></button>
                    </form>
                </div>
            </>)}
        </div>
    </>)
}

export default ResponseDisplay
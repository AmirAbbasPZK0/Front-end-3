import ReactMarkdown from "react-markdown"
import { hyperTextForMarkDown } from "@/functions/hypertext";
import { useState , useEffect, RefObject, useRef} from "react";
import HyperLink from "./HyperLink";
import { snippetAndTitleHandler } from "@/functions/snippetAndTitleHandler";
import { FaMinusCircle, FaRegCheckCircle , FaRegTimesCircle } from "react-icons/fa";
import Source from "./Source";
import SourceButton from "./SourceButton";
import { TbSend2 } from "react-icons/tb";
import { isRTL } from "@/functions/isRTL";
import { LiaTimesSolid } from "react-icons/lia";
import FactCheckSourceList from "./FactCheckSourceList";
import React from "react";
import { checkIsEmpty } from "@/functions/checkIsEmpty";
import ModuleIcon from "./ModuleIcons";
import useWebSocket from "@/hooks/useWebSocket";
import { useAppSelector } from "@/services/redux/store";
import { FaRegCircleStop } from "react-icons/fa6";

interface ClaimAnswerProps { 
    answer : {
        Reasoning : string
        Verdict : string
    },
    citation : {
        [key : number] : any[]
    }
    claim : string
}

interface DataProps {
    claim_1 ?: ClaimAnswerProps,
    claim_2 ?: ClaimAnswerProps,
    claim_3 ?: ClaimAnswerProps,
}

type Sources = {
    [id : string] : any[]
}

type Source = Array<Array<string>>

interface HyperLink {
    [link : string] : string[]
}

interface FactCheckDisplayProps {
    data : DataProps , 
    sources : Sources[] | Source , 
    query : string 
    sendMessage : (followUp : string) => void
}

const FactCheckDisplay = ({data , sources , query , sendMessage} : FactCheckDisplayProps) => {

    const [hyperLinkTooltip , setHyperLinkTooltip] = useState<HyperLink | null >(null)

    const {socket} = useWebSocket()

    const selectedModule = useAppSelector(state => state.resourceSlice.selectedResource)

    const isGenerating = useAppSelector(state => state.newThreadSlice.isAllowed)

    const [followUp , setFollowUp] = useState("")

    const [openSources, setOpenSources] = useState(false)

    const [isSubmited , setIsSubmited] = useState(false)

    const textareaRef : RefObject<HTMLTextAreaElement | null> = useRef(null)

    useEffect(()=>{
        setHyperLinkTooltip(snippetAndTitleHandler(Object.values(data as DataProps)))
    },[sources])

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [followUp]);

    useEffect(() => {
        const handleKeyDown = (event: { key: string; }) => {
            if(isSubmited){
                return  
            }else{
                if(event.key === "Enter") {
                    if(checkIsEmpty(followUp)){
                        sendMessage(followUp)
                        setIsSubmited(true)
                        setFollowUp("")
                    }
                }
            }
        };
    
        window.addEventListener("keydown", handleKeyDown);
    
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      }, [followUp]);    

    return (<>
        <div className="p-4 rounded-3xl gap-4 md:w-[80%] w-[100%] flex items-end flex-col">
            <div className="dark:bg-[#202938] flex flex-row shadow-md justify-end text-end items-end bg-white rounded-b-3xl rounded-tl-3xl p-4">
                <h2 className="text-[15px] flex items-end justify-end text-end p-2 font-semibold">{query}</h2>
            </div>
            {Object.values(data as DataProps)?.map((item : ClaimAnswerProps , index : number) => {
                
                const styles = item?.answer?.Verdict === "True" ? "text-green-500" : item?.answer?.Verdict === "False" ? "text-red-300" : "text-yellow-400"

                const verdictStatus = item?.answer?.Verdict === "True" ? <FaRegCheckCircle/> : item?.answer?.Verdict === "False" ? <FaRegTimesCircle/> : <FaMinusCircle/>

                return(<React.Fragment key={index}>
                    <div className="dark:bg-[#202938] bg-white flex flex-col w-full shadow-md rounded-3xl gap-2 p-4">
                        <div className="flex flex-row gap-2 items-center justify-between">
                            <h1 className="font-bold text-slate-700 dark:text-slate-300 text-[24px] flex items-center gap-1"><p className={`text-[20px] rounded-md ${styles}`}>{verdictStatus}</p>{item?.claim}</h1>
                            <h2 className={`p-2 rounded-xl border-2 font-semibold ${item?.answer?.Verdict === "True" ? "border-green-500 text-green-500" : item?.answer?.Verdict === "False" ? "border-red-500 text-red-500" : "border-yellow-400 text-yellow-400"}`}>{item?.answer?.Verdict}</h2>
                        </div>
                        <ReactMarkdown components={{
                            h1 : (props) => <h1 className='text-[20px] font-bold pt-2 pb-2' {...props}/>,
                            h2 : (props) => <h2 className='text-[17px] font-semibold pt-2 pb-2' {...props}/>,
                            a : (props) => <HyperLink data={hyperLinkTooltip?.[props.href as string]} href={props.href as string}>{props.children}</HyperLink>,
                            ul : (props) => <ul {...props}/>,
                            li : (props) => <li {...props} className='p-2 flex gap-2'><div>{props.children}</div></li>
                        }} >
                            {Object.values(item?.citation) ? hyperTextForMarkDown(item?.answer?.Reasoning , Object.values(item?.citation)) : item?.answer?.Reasoning}
                        </ReactMarkdown>
                            <FactCheckSourceList sources={Object.values(item?.citation)}/>
                                    <div className={`flex flex-col gap-4 p-3 bg-slate-200 dark:bg-slate-900 ${openSources ? 'translate-x-0' : 'translate-x-full'} transition-all duration-300 ease-in-out right-0 top-0 fixed flex-col z-50 dark:text-white w-[360px] h-[100vh]`}>
                                        <div className='flex flex-row w-full justify-between'>
                                                <div className='flex flex-col'>
                                                    <h3 className='text-slate-900 dark:text-slate-100 font-semibold text-[30px]'>Sources</h3>
                                                    <p className='text-gray-500'>From {Object.values(item?.citation).length} sources</p>
                                                </div>
                                                <button className="p-3 text-[20px]" onClick={()=>{
                                                    setOpenSources(false)
                                                }}><LiaTimesSolid/></button>
                                        </div>
                                            <div className='flex flex-col h-[100vh] bg-slate-200 dark:bg-slate-900 w-full gap-4 overflow-auto'>
                                                {Object.values(item?.citation)?.map((source , key) => {
                                                    return(<React.Fragment key={key}>
                                                        <li key={key} className="flex w-full p-2 items-start">
                                                            <Source data={{title : source?.[3] , snippet : source?.[4] , link : source?.[2] , verify : source?.[5]}} title={source[0]}/>
                                                        </li>
                                                    </React.Fragment>)
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>)
                            }
                        )}
                

                {!isSubmited && (<>
                <div className="rounded-3xl fixed bottom-2 w-[80%] left-[10%] z-30 dark:bg-[#202938] bg-white border-2 border-[#bababa]  shadow-md p-3 flex flex-col">
                    <form onSubmit={(e)=>{
                        e.preventDefault()
                        if(checkIsEmpty(followUp)){
                            sendMessage(followUp)
                        }
                    }} className="flex items-center justify-center w-ful flex-row gap-2" action="">
                        <button type="button">
                            <ModuleIcon className="text-[10px] p-2" moduleName={selectedModule}/>
                        </button>
                        <textarea ref={textareaRef} dir="auto" value={followUp} className={`w-full ${isRTL(followUp) ? "text-right" : "text-left"} resize-none w-full min-h-2 h-full justify-center items-center flex overflow-hidden placeholder-gray-500 bg-transparent outline-none`} onChange={(e)=> setFollowUp(e.target.value)} placeholder="Follow-Up"></textarea>
                        {isGenerating ? (<>
                            <button type="submit" className="rounded-full0 p-2"><TbSend2 className="text-[30px]"/></button>
                        </>) : (<>
                            <button type="button" onClick={()=>{
                                socket.emit("cancel_generation")
                            }} className="rounded-full0 p-2"><FaRegCircleStop className="text-[30px]"/></button>
                        </>)}
                    </form>
                </div>
            </>)}
            
        </div>
    </>);
}
 
export default FactCheckDisplay;
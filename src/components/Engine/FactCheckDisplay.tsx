import ReactMarkdown from "react-markdown"
import { hyperTextForMarkDown } from "@/functions/hypertext";
import { useState , useEffect} from "react";
import HyperLink from "./HyperLink";
import { snippetAndTitleHandler } from "@/functions/snippetAndTitleHandler";
import { FaMinusCircle, FaRegCheckCircle , FaRegTimesCircle } from "react-icons/fa";

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

type Sources = {
    [id : string] : string[]
}

interface Source {
    title : string
    url : string
}

interface HyperLink {
    [link : string] : string[]
}

const FactCheckDisplay = ({data , sources , query} : {data : DataProps , sources : Sources[] | Source[] , query : string}) => {

    const [hyperLinkTooltip , setHyperLinkTooltip] = useState<HyperLink | null>(null)

    useEffect(()=>{
        setHyperLinkTooltip(snippetAndTitleHandler(sources))
    },[sources])

    return (<>
        <div className="p-4 rounded-3xl gap-4 md:w-[80%] w-[100%] flex items-end flex-col">
            <div className="dark:bg-[#202938] flex flex-row justify-end text-end items-end bg-white rounded-b-3xl rounded-tl-3xl p-4">
                <h2 className="text-[15px] flex items-end justify-end text-end p-2 font-semibold">{query}</h2>
            </div>
            {Object.values(data)?.map((item : ClaimAnswerProps) => {
                
                const styles = item?.answer?.Verdict === "True" ? "text-green-500" : item?.answer?.Verdict === "False" ? "text-red-300" : "text-yellow-400"

                const verdictStatus = item?.answer?.Verdict === "True" ? <FaRegCheckCircle/> : item?.answer?.Verdict === "False" ? <FaRegTimesCircle/> : <FaMinusCircle/>

                return(<>
                    <div className="dark:bg-[#202938] bg-white flex flex-col w-full shadow-md rounded-3xl gap-2 p-4">
                        <div className="flex flex-row gap-2 items-center justify-between">
                            <h1 className="font-bold text-slate-700 dark:text-slate-300 text-[24px] flex items-center gap-1"><p className={`text-[20px] rounded-md ${styles}`}>{verdictStatus}</p>{item?.claim}</h1>
                            <h2 className={`p-2 rounded-xl ${item?.answer?.Verdict === "True" ? "bg-green-500 text-white" : item?.answer?.Verdict === "False" ? "bg-red-500 text-white" : "bg-yellow-400"}`}>{item?.answer?.Verdict}</h2>
                        </div>
                        <ReactMarkdown components={{
                            h1 : (props) => <h1 className='text-[20px] font-bold pt-2 pb-2' {...props}/>,
                            h2 : (props) => <h2 className='text-[17px] font-semibold pt-2 pb-2' {...props}/>,
                            a : (props) => <HyperLink data={hyperLinkTooltip?.[props.href as string]} href={props.href as string}>{props.children}</HyperLink>,
                            ul : (props) => <ul {...props}/>,
                            li : (props) => <li {...props} className='p-2 flex gap-2'><div>{props.children}</div></li>
                        }} >
                            {sources ? hyperTextForMarkDown(item?.answer?.Reasoning , Object.values(sources?.[0])) : item?.answer?.Reasoning}
                        </ReactMarkdown>
                    </div>
                </>)
            })}
            
        </div>
    </>);
}
 
export default FactCheckDisplay;
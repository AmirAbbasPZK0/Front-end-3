import ReactMarkdown from "react-markdown"
import { hyperTextForMarkDown } from "@/functions/hypertext";
import { useState , useEffect} from "react";
import HyperLink from "./HyperLink";
import { snippetAndTitleHandler } from "@/functions/snippetAndTitleHandler";

const FactCheckDisplay = ({data , sources , query } : {data : any , sources : any , query : string}) => {

    const [hyperLinkTooltip , setHyperLinkTooltip] = useState<any>(null)

    useEffect(()=>{
        setHyperLinkTooltip(snippetAndTitleHandler(sources))
    },[sources])

    return (<>
        <div className="p-4 rounded-3xl gap-4 md:w-[80%] w-[100%] flex items-end flex-col">
            <div className="dark:bg-[#202938] flex flex-row justify-end text-end items-end bg-white rounded-b-3xl rounded-tl-3xl p-4">
                <h2 className="text-[15px] flex items-end justify-end text-end p-2 font-semibold">{query}</h2>
            </div>
            {Object.values(data)?.map((item : any) => (<>
                <div className="dark:bg-[#202938] bg-white w-full shadow-md rounded-3xl p-4">
                    <h1 className="font-bold text-slate-700 text-[24px]">{item?.claim}</h1>
                    <ReactMarkdown components={{
                        h1 : (props) => <h1 className='text-[20px] font-bold pt-2 pb-2' {...props}/>,
                        h2 : (props) => <h2 className='text-[17px] font-semibold pt-2 pb-2' {...props}/>,
                        a : (props) => <HyperLink data={hyperLinkTooltip?.[props.href as string]} href={props.href as string}>{props.children}</HyperLink>,
                        ul : (props) => <ul {...props}/>,
                        li : (props) => <li {...props} className='p-2 flex gap-2'><div>{props.children}</div></li>
                    }} >
                    {sources ? hyperTextForMarkDown(item?.answer , Object.values(sources?.[0])) : item?.answer}
                    </ReactMarkdown>
                </div>
            </>))}
        </div>
    </>);
}
 
export default FactCheckDisplay;
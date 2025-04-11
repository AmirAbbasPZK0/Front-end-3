interface SourceButtonProps {
    onClick ?: () => void
    sources : Array<Array<string>>
    factCheckSources ?: any
}

const SourceButton = ({onClick , sources , factCheckSources} : SourceButtonProps) => {


    console.log(sources)

    return (<>
        <button className="flex w-[160px] flex-row gap-2 items-center p-1 pl-3 pr-2 rounded-full border-slate-400 border-2" onClick={onClick}>
            <span className="text-[17px] font-semibold">Sources</span>
            <div className="flex gap-2.5 items-center -space-x-4">
                {sources?.slice(0,3)?.map((item : string[] , index : number) => (
                    <img key={index} className="inline-block h-5 w-5 rounded-full ring-2 ring-slate-100" src={`https://www.google.com/s2/favicons?domain_url=https://${item?.[2]?.split("/")[2]}`} alt="" />
                ))}
                <span className="pl-2.5 text-[10px]">+{sources.length - 3}</span>
            </div>
        </button>
    </>);
}
 
export default SourceButton;
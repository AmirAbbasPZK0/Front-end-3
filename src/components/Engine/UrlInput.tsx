import { FaMinus } from "react-icons/fa";
import { useAppDispatch , useAppSelector } from "@/services/redux/store";
import { editUrl , filterTheUrls} from "@/services/redux/reducers/urlInputSlice";
import { addResource } from "@/services/redux/reducers/resourceSlice";


interface UrlInputProps {
    index : number
    url : string
    urlInputs : string[]
    // setUrlInputs : (input : string[]) => void
    disabled ?: boolean
}

const UrlInput = ({...props} : UrlInputProps) => {

    const dispatch = useAppDispatch()
    const urls = useAppSelector(state => state.urlInputSlice.urlInputs)

    return (<>
        <div key={props.index} className="flex items-center mb-2 mt-2 w-full gap-2">
            <input
                disabled={props.disabled}
                type="text"
                value={props.url}
                onChange={(e) => dispatch(editUrl({index : props.index, value : e.target.value}))}
                className="border-2 border-slate-400 dark:border-slate-100 px-5 p-[13px] rounded-md bg-transparent w-full"
                placeholder="Paste your URL here"
            />
            <button
                onClick={() => {
                    if(urls.length - 1 > 0){
                        dispatch(filterTheUrls({index : props.index}))
                    }else{
                        dispatch(addResource("web"))
                    }
                }}
                className="bg-transparent border-2 border-slate-400 dark:border-slate-100 text-white p-[16px] rounded"
                type="button"
            >
                <FaMinus className="text-slate-900 dark:text-slate-100"/>
            </button>
        </div>     
    </>);
}
 
export default UrlInput;
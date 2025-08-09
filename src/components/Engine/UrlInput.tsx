import { FaMinus } from "react-icons/fa";
import { useAppDispatch , useAppSelector } from "@/services/redux/store";
import { editUrl , filterTheUrls} from "@/services/redux/reducers/urlInputSlice";
import { selectResource } from "@/services/redux/reducers/resourceSlice";


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
        <div key={props.index} className="flex items-center mb-2 mt-2 w-full justify-center gap-2">
            <input
                disabled={props.disabled}
                type="text"
                value={props.url}
                onChange={(e) => dispatch(editUrl({index : props.index, value : e.target.value}))}
                className=" bg-slate-50 shadow-md dark:bg-[#202938] px-5 p-[13px] rounded-2xl w-full"
                placeholder="Paste your URL here"
            />
            <button
                onClick={() => {
                    if(urls.length - 1 > 0){
                        dispatch(filterTheUrls({index : props.index}))
                    }else{
                        dispatch(selectResource("web"))
                    }
                }}
                className="bg-slate-50 shadow-md dark:bg-[#202938] p-[16px] rounded-2xl"
                type="button"
            >
                <FaMinus className="text-slate-900 dark:text-slate-100"/>
            </button>
        </div>     
    </>);
}
 
export default UrlInput;
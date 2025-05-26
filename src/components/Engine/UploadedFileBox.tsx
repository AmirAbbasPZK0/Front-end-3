"use client"

// import ChosenIcon from "./ChosenIcon"
import { removeFile } from "@/services/redux/reducers/fileUploadSlice"
import { useAppDispatch } from "@/services/redux/store"
import { FaTrash } from 'react-icons/fa';
import { FaFilePdf } from "react-icons/fa6";
import { CiFileOn } from "react-icons/ci";

interface UploadedFileBoxProps {
    data : {
        name : string,
        url : string
    }
}

const UploadedFileBox = ({data} : UploadedFileBoxProps) => {
    
    const dispatch = useAppDispatch()

    const endpoint = data.name.split(".")[data.name.split(".").length - 1]
    
    return (<>
        <div className="flex flex-row mt-2 justify-between text-center gap-5 w-full bg-slate-50 shadow-md dark:bg-[#202938] p-4 rounded-2xl">
            <p className="flex flex-row items-center gap-3">
                <FilePic endpoint={endpoint} imageUrl={data.url}/>
                {data.name}
            </p>
            <button onClick={()=>{
                dispatch(removeFile(data))
            }}><FaTrash/></button>
        </div>
    </>);
}

const FilePic = ({endpoint , imageUrl} : {endpoint : string , imageUrl : string | null}) => {
    switch(endpoint){
        case "pdf":
            return <FaFilePdf className="w-7 h-7"/>
        case "jpeg":
            return <img className="w-7 h-7 rounded-md" src={imageUrl as string} alt="img" />
        case "png":
            return <img className="w-7 h-7 rounded-md" src={imageUrl as string} alt="img" />
        case "jpg":
            return <img className="w-7 h-7 rounded-md" src={imageUrl as string} alt="img" />
        case "webp":
            return <img className="w-7 h-7 rounded-md" src={imageUrl as string} alt="img" />
        default:
            return <CiFileOn className="w-7 h-7"/>
    }
}
 
export default UploadedFileBox;
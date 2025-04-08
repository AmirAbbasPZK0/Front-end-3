"use client"

// import ChosenIcon from "./ChosenIcon"
import { removeFile } from "@/services/redux/reducers/fileUploadSlice"
import { useAppDispatch } from "@/services/redux/store"
import { FaTrash } from 'react-icons/fa';

interface UploadedFileBoxProps {
    data : {
        name : string,
        url : string
    }
}

const UploadedFileBox = ({data} : UploadedFileBoxProps) => {
    
    const dispatch = useAppDispatch()
    
    return (<>
        <div className="flex flex-row mt-2 justify-between text-center gap-5 w-full bg-slate-50 shadow-md dark:bg-[#202938] p-4 rounded-2xl">
            <p className="flex flex-row items-center gap-3">
                {/* {
                    data.name.split(".")[data.name.split(".").length -1] === "png" ||
                    data.name.split(".")[data.name.split(".").length -1] === "jpg" ||
                    data.name.split(".")[data.name.split(".").length -1] === "jpeg" ? 
                    <img className="w-[26px] rounded-md h-[26px] object-cover" src={data.url} alt="img" /> : 
                    <span>d</span>
                } */}
                {data.name}
            </p>
            <button onClick={()=>{
                dispatch(removeFile(data))
            }}><FaTrash/></button>
        </div>
    </>);
}
 
export default UploadedFileBox;
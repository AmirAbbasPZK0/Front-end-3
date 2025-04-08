"use client"
import { useState } from "react";
import { useAppDispatch , useAppSelector } from "@/services/redux/store";
import { addResource } from "@/services/redux/reducers/resourceSlice";
import { IoEarth } from "react-icons/io5";
import { FaLink } from "react-icons/fa6";
import { FaRegLightbulb } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa6";
import { CiMedicalCase } from "react-icons/ci";

const moduleList = [
    {
        title : "web",
        color : "#008f7a"
    },
    {
        title : "url",
        color : "#EDD598"
    },
    {
        title : "fact check",
        color : "#0b87b6"
    },
    {
        title : "videos",
        color : "#7332a1"
    },
    {
        title : "academic",
        color : "#c31069"
    },
    {
        title : "medical",
        color : "#c67f48"
    }
]


const NewDropdown = () => {
    
    const [isOpen , setIsOpen] = useState(false)

    const selectedResources = useAppSelector(state => state.resourceSlice.selectedResource)

    return (<>
        <button type="button" className="flex gap-2 items-center" onClick={()=> setIsOpen(item => !item)}>
            <ModuleIcon className={`text-[18px]`} color={"#121212"} moduleName={selectedResources}/>
            <p className="flex items-start text-[14px] md:text-[18px]">{selectedResources.charAt(0).toUpperCase() + selectedResources.slice(1)}</p>
        </button>
        {isOpen && <Bar setIsOpen={setIsOpen}/>}
    </>);
}

const Bar = ({setIsOpen} : {setIsOpen : (item : boolean)=> void}) => {

    const dispatch = useAppDispatch()

    return(<>
        <div onClick={()=> setIsOpen(false)} className="fixed top-0 left-0 w-full h-full z-20"/>
        <div className="flex flex-col gap-2 bg-slate-100 shadow-md dark:bg-slate-800 rounded-md absolute top-[55%] z-30 p-3">
            <div className="grid md:grid-cols-3 gap-2">
                {moduleList?.map(item => (
                    <button key={item.color} type="button" onClick={()=>{
                        dispatch(addResource(item.title))
                        setIsOpen(false)
                    }} className={`w-full p-2 rounded-md flex flex-end gap-2 items-center transition-all hover:dark:bg-slate-900 hover:bg-slate-200`}>
                        <ModuleIcon className={`text-[18px]`} color={item.color} moduleName={item.title}/>
                        <p className="text-[18px]">{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</p>
                    </button>
                ))}
            </div>
        </div>
    </>)
}

const ModuleIcon = ({moduleName , className , color} : {moduleName : string , className : string , color : string}) => {
    switch(moduleName){
        case "web":
            return <IoEarth style={{color : "#008f7a"}} className={className}/>
        case "url":
            return <FaLink style={{color : "#EDD598"}} className={className}/>
        case "fact check":
            return <FaRegLightbulb style={{color : "#0b87b6"}} className={className}/>
        case "videos":
            return <MdOutlineOndemandVideo style={{color : "#7332a1"}} className={className}/>
        case "academic":
            return <FaGraduationCap style={{color : "#c31069"}} className={className}/>
        case "medical":
            return <CiMedicalCase style={{color : "#c67f48"}} className={className}/>
    }
}
 
export default NewDropdown;
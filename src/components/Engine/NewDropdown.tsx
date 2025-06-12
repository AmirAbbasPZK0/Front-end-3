"use client"
import { useState } from "react";
import { useAppSelector } from "@/services/redux/store";
import { IoEarth } from "react-icons/io5";
import { FaLink } from "react-icons/fa6";
import { FaRegLightbulb } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa6";
import { CiMedicalCase } from "react-icons/ci";
import ModulesModal from "./ModulesModal";
import { IoMdArrowDropdown } from "react-icons/io";


const NewDropdown = () => {
    
    const [isOpen , setIsOpen] = useState(false)

    const selectedResources = useAppSelector(state => state.resourceSlice.selectedResource)

    return (<>
        <button type="button" className="flex p-2 rounded-xl gap-2 items-center" onClick={()=> setIsOpen(item => !item)}>
            <ModuleIcon className={`text-[18px]`} moduleName={selectedResources}/>
            <p className="flex items-start text-[14px] font-semibold md:text-[18px]">{selectedResources.charAt(0).toUpperCase() + selectedResources.slice(1)}</p>
            <IoMdArrowDropdown/>
        </button>
        {/* {isOpen && <Bar setIsOpen={setIsOpen}/>} */}
        {isOpen && <ModulesModal setClose={()=> setIsOpen(false)}/>}
    </>);
}


const ModuleIcon = ({moduleName , className} : {moduleName : string , className : string }) => {
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
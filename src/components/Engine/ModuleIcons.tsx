import { CiMedicalCase } from "react-icons/ci"
import { FaGraduationCap, FaLink, FaRegLightbulb } from "react-icons/fa"
import { IoEarth } from "react-icons/io5"
import { MdOutlineOndemandVideo } from "react-icons/md"

const ModuleIcon = ({moduleName , className} : {moduleName : string , className ?: string }) => {
    switch(moduleName){
        case "web":
            return <IoEarth style={{color : "#008f7a"}} className={`${className} text-[40px]`}/>
        case "url":
            return <FaLink style={{color : "#EDD598"}} className={`${className} text-[40px]`}/>
        case "fact check":
            return <FaRegLightbulb style={{color : "#0b87b6"}} className={`${className} text-[37px]`}/>
        case "videos":
            return <MdOutlineOndemandVideo style={{color : "#7332a1"}} className={`${className} text-[40px]`}/>
        case "academic":
            return <FaGraduationCap style={{color : "#c31069"}} className={`${className} text-[40px]`}/>
        case "medical":
            return <CiMedicalCase style={{color : "#c67f48"}} className={`${className} text-[42px]`}/>
    }
}


export default ModuleIcon
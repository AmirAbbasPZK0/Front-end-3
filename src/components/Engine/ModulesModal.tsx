import { AnimatePresence, motion } from "motion/react";
import { IoEarth } from "react-icons/io5";
import { FaLink } from "react-icons/fa6";
import { FaRegLightbulb } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa6";
import { CiMedicalCase } from "react-icons/ci";
import { useAppDispatch } from "@/services/redux/store";
import { addResource } from "@/services/redux/reducers/resourceSlice";

interface ModulesModalProps {
    setClose : (value : boolean) => void
}

const moduleList = [
    {
        title : "web",
        color : "#008f7a",
        description : "This module fetches fresh content from the web, pulling in relevant pages or data based on user queries."
    },
    {
        title : "url",
        color : "#EDD598",
        description : "Users can submit a link, and the bot summarizes or extracts key information directly from that webpage."
    },
    {
        title : "fact check",
        color : "#0b87b6",
        description : "This module checks whether a statement is true or false using reliable sources or fact-checking databases."
    },
    {
        title : "videos",
        color : "#7332a1",
        description : "It locates videos (e.g., from YouTube) based on a query and optionally summarizes the key points or provides transcripts."
    },
    {
        title : "academic",
        color : "#c31069",
        description : "This module pulls scholarly articles, papers, and citations from sources like Google Scholar or Semantic Scholar."
    },
    {
        title : "medical",
        color : "#c67f48",
        description : "It answers health-related questions using reputable medical sources like Mayo Clinic or WebMD, with disclaimers when necessary."
    }
]

const ModulesModal = ({setClose} : ModulesModalProps) => {

    const dispatch = useAppDispatch()

    return (<>
        <AnimatePresence>
        <div className="fixed inset-2 z-50 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50"
                onClick={()=> setClose(false)}
            />
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="fixed w-[800px] max-w-md dark:bg-slate-900 text-center flex flex-col rounded-2xl bg-white p-8 shadow-xl"
            >
                <div className="flex m-4 justify-between">
                    <div/>
                    <button onClick={()=>setClose(false)}><RxCross1 /></button>
                </div>
                <h1 className="text-[20px] font-semibold">Select a Module</h1>
                <div className="grid grid-cols-2 mt-3 md:grid-cols-1 md:gap-4">
                    {moduleList?.map(item => (
                        <button type="button" onClick={()=>{
                            setClose(false)
                            dispatch(addResource(item.title))
                        }} className="flex gap-2 md:flex-row flex-col items-center cursor-pointer justify-center text-center md:justify-start md:text-start p-3 transition-all hover:scale-[1.05] border-2 rounded-md border-slate-300">
                            <ModuleIcon  moduleName={item.title}/> 
                            <div className="flex flex-col gap-1">
                                <h4 className="text-[15px]">{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</h4>
                                <p className="text-[10px]">{item.description}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
        </AnimatePresence>
    </>);
}


const ModuleIcon = ({moduleName , className} : {moduleName : string , className ?: string }) => {
    switch(moduleName){
        case "web":
            return <IoEarth style={{color : "#008f7a"}} className={`${className} text-[40px]`}/>
        case "url":
            return <FaLink style={{color : "#EDD598"}} className={`${className} text-[40px]`}/>
        case "fact check":
            return <FaRegLightbulb style={{color : "#0b87b6"}} className={`${className} text-[30px]`}/>
        case "videos":
            return <MdOutlineOndemandVideo style={{color : "#7332a1"}} className={`${className} text-[40px]`}/>
        case "academic":
            return <FaGraduationCap style={{color : "#c31069"}} className={`${className} text-[40px]`}/>
        case "medical":
            return <CiMedicalCase style={{color : "#c67f48"}} className={`${className} text-[50px]`}/>
    }
}
 
export default ModulesModal;
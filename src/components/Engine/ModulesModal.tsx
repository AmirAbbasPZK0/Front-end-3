import { AnimatePresence, motion } from "motion/react";
import { RxCross1 } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "@/services/redux/store";
import { selectResource } from "@/services/redux/reducers/resourceSlice";
import { FaCheck } from "react-icons/fa6";
import ModuleIcon from "./ModuleIcons";


interface ModulesModalProps {
    setClose: (value: boolean) => void
}

const moduleList = [
    {
        title: "web",
        color: "#008f7a",
        description: "Fresh web results"
    },
    {
        title: "url",
        color: "#EDD598",
        description: "Answers from links"
    },
    {
        title: "fact check",
        color: "#0b87b6",
        description: "True or False?"
    },
    {
        title: "videos",
        color: "#7332a1",
        description: "Answers from videos"
    },
    {
        title: "academic",
        color: "#c31069",
        description: "Scholarly sources"
    },
    {
        title: "medical",
        color: "#c67f48",
        description: "Trusted health info"
    }
]

const ModulesModal = ({ setClose }: ModulesModalProps) => {

    const dispatch = useAppDispatch()

    const selectedModule = useAppSelector(state => state.resourceSlice.selectedResource)

    return (<>
        <AnimatePresence>
            <div className="fixed inset-2 z-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50"
                    onClick={() => setClose(false)}
                />
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="fixed w-[90vw] max-w-md dark:bg-slate-900 text-center flex flex-col rounded-2xl bg-white p-8 shadow-xl"
                >
                    <div className="flex m-4 justify-between">
                        <div />
                        <button onClick={() => setClose(false)}><RxCross1 /></button>
                    </div>
                    <h1 className="text-[25px] font-semibold">Select a Module</h1>
                    <div className="grid grid-cols-2 mt-10 md:grid-cols-1 md:gap-4">
                        {moduleList?.map(item => (
                            <button key={item.title} className={`transition-all flex flex-col md:flex-row items-center justify-between hover:scale-[1.05] md:border-2  rounded-md ${selectedModule === item.title ? "border-2 border-green-500" : "dark:border-slate-500"}`} type="button" onClick={() => {
                                setClose(false)
                                dispatch(selectResource(item.title))
                            }}>
                                <div className="flex gap-2 md:flex-row flex-col items-center cursor-pointer justify-center text-center md:justify-start md:text-start p-3 ">
                                    <ModuleIcon moduleName={item.title} />
                                    <div className="flex flex-col">
                                        <h4 className="text-[15px] font-semibold">{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</h4>
                                        <p className="text-[13px]">{item.description}</p>
                                    </div>
                                </div>
                                {item.title === selectedModule && <span className="p-3 md:block hidden text-green-600"><FaCheck /></span>}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    </>);
}


export default ModulesModal;
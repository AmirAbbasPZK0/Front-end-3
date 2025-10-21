import { AnimatePresence , motion } from "motion/react";
import LoginFormHandler from "../Register/LoginFormHandler";
import { LiaTimesSolid } from "react-icons/lia";

const AuthModal = ({setClose} : {setClose : (value : boolean) => void }) => {

    return (<>
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={()=> setClose(false)}
                />
                
                {/* Modal Content */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative w-full max-w-md bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 overflow-hidden"
                >   
                    {/* Close Button */}
                    <button 
                        onClick={()=> setClose(false)}
                        className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full"
                    >
                        <LiaTimesSolid className="w-5 h-5"/>
                    </button>
                    
                    {/* Form Content */}
                    <div className="p-6 pt-8">
                        <LoginFormHandler onClose={setClose}/>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    </>);
}
 
export default AuthModal;
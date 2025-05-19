import { AnimatePresence , motion } from "motion/react";
import LoginFormHandler from "../Register/LoginFormHandler";
import { LiaTimesSolid } from "react-icons/lia";

const AuthModal = ({setClose} : {setClose : (value : boolean) => void }) => {

    return (<>
        <AnimatePresence>
            <div className="fixed flex-col inset-0 z-50 flex items-center justify-center">
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
                    className="relative w-full max-w-md gap-4 dark:bg-slate-900  text-center flex flex-col rounded-2xl bg-white p-8 shadow-xl"
                >   
                    <button onClick={()=> setClose(false)}><LiaTimesSolid/></button>
                    <LoginFormHandler onClose={setClose}/>
                </motion.div>
            </div>
        </AnimatePresence>
    </>);
}
 
export default AuthModal;
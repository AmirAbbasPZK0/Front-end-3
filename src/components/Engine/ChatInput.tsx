import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { BiSend } from "react-icons/bi";
import { TbSend2 } from "react-icons/tb";
import ModuleIcon from "./ModuleIcons";
import { checkIsEmpty } from "@/functions/checkIsEmpty";
import useAgent from "@/hooks/useAgent";


interface ChatInputProps {
  sendMessage : (value : string)=> void
  followUp : string
  isSubmited : boolean
  setIsSubmited : (value : boolean) => void
  setFollowUp : (value : string) => void
  selectedModule : string
}

const ChatInput: React.FC<ChatInputProps> = ({ sendMessage , followUp , isSubmited , setIsSubmited , setFollowUp , selectedModule}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {isMobile} = useAgent()

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (!isSubmited && event.key === "Enter" && checkIsEmpty(followUp) && !event.shiftKey) {
            console.log(isMobile)
            // if(!isMobile){
            //     sendMessage(followUp);
            //     setIsSubmited(true);
            //     setFollowUp("");
            // }
        }
  }, [isSubmited, followUp, sendMessage]);

  // Auto resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // reset
      textarea.style.height = `${textarea.scrollHeight}px`; // adjust
    }
  }, [followUp]);

  useEffect(() => {        
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <motion.form
      onSubmit={(e)=>{
        e.preventDefault()
        if(checkIsEmpty(followUp)){
          sendMessage(followUp)
          setIsSubmited(true)
          setFollowUp("")
        }
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed z-30 bottom-2 md:w-[78%] w-[92%]"
    >
      <div className="flex items-center rounded-full px-3 py-2 shadow-lg border bg-white dark:bg-slate-800 dark:border-slate-700">
                        
        <button
          type="button"
          className="p-2 text-neutral-400 hover:text-white transition"
        >
          <ModuleIcon className="text-[10px] p-2" moduleName={selectedModule}/>
            </button>
            
            {/* Input */}
            <input
            type="text"
            className="flex-1 bg-transparent px-3 text-sm placeholder-neutral-400 focus:outline-none"
            placeholder="Ask anything"
            // value={message}
            onChange={(e) => setFollowUp(e.target.value)}
            />

            {/* Right icons */}
            {/* <button
            type="button"
            className="p-2 text-neutral-400 hover:text-white transition"
            >
            </button> */}
        <button
          type="submit"
          className="p-2 text-neutral-400 hover:text-black dark:hover:text-white transition"
        >
          <TbSend2 className="text-[25px]"/>
        </button>
      </div>

      </motion.form>
  );
};

export default ChatInput;

import React, { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { TbSend2 } from "react-icons/tb";
import ModuleIcon from "./ModuleIcons";
import { checkIsEmpty } from "@/functions/checkIsEmpty";
import useAgent from "@/hooks/useAgent";
import STTRecorder from "./STTRecorder";


interface ChatInputProps {
  sendMessage: (value: string) => void
  followUp: string
  isSubmited: boolean
  setIsSubmited: (value: boolean) => void
  setFollowUp: (value: string) => void
  selectedModule: string
}

const ChatInput: React.FC<ChatInputProps> = ({ sendMessage, followUp, isSubmited, setIsSubmited, setFollowUp, selectedModule }) => {

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const boxRef = useRef<HTMLDivElement>(null)

  const { isMobile } = useAgent()

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isSubmited && event.key === "Enter" && checkIsEmpty(followUp) && !event.shiftKey) {
      if (!isMobile) {
        sendMessage(followUp);
        setIsSubmited(true);
        setFollowUp("");
      }
    }
  }, [isSubmited, followUp, sendMessage]);

  // Auto resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    const box = boxRef.current;
    if (textarea && box) {
      textarea.style.height = "auto"; // reset
      textarea.style.height = `${textarea.scrollHeight}px`; // adjust
      box.style.height = `${textarea.scrollHeight}px`;
    }
  }, [followUp]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <motion.div
      ref={boxRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed z-30 bottom-4 min-h-[60px] md:w-[78%] w-[92%]"
    >
      <div className={`flex items-center rounded-lg h-full px-3 py-2 shadow-sm border bg-white dark:bg-slate-800 dark:border-slate-700`}>

        <div className="h-full flex items-end justify-center">
          <button
            type="button"
            className="text-neutral-400 hover:text-white transition"
          >
            <ModuleIcon className="text-[10px] p-2" moduleName={selectedModule} />
          </button>
        </div>

        <textarea
          ref={textareaRef}
          value={followUp}
          onChange={(e) => setFollowUp(e.target.value)}
          placeholder="Ask anything"
          rows={1} // auto-expandable if you want
          className="w-full resize-none  bg-transparent placeholder-gray-400 border-none outline-none"
        />

        <div className='flex flex-row gap-2 items-center justify-center'>
          <STTRecorder sendMessage={sendMessage} />
          <button onClick={() => {
            if (checkIsEmpty(followUp)) {
              setFollowUp("")
              sendMessage(followUp);
              setIsSubmited(true)
            }
          }} className='text-[20px] p-1' type='submit'><TbSend2 /></button>

        </div>

        {/* <div className="h-full flex items-end justify-end">
          <STTRecorder sendMessage={sendMessage} />
          <button
            onClick={() => {
              if (checkIsEmpty(followUp)) {
                sendMessage(followUp)

              }
            }}
            type="button"
            className="p-2 text-neutral-400 hover:text-black dark:hover:text-white transition"
          >
            <TbSend2 className="text-[25px]" />
          </button>
        </div> */}
      </div>

    </motion.div>
  );
};

export default ChatInput;

// SlidePageSTT.tsx
import React, { useState, useRef } from "react";
import { RiVoiceprintLine } from "react-icons/ri";
import { FaMicrophone } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FaStop , FaTimes } from "react-icons/fa";


interface SpeechRecognitionCustom extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEventCustom) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionEventCustom extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}


const SlidePageSTT: React.FC<{sendMessage : (prompt :string)=> void}> = ({sendMessage}) => {

  
  const [open, setOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognitionCustom | null>(null);

  const startRecording = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEventCustom) => {
      let text = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
    };

    recognition.onerror = (e: any) => console.error(e);
    recognition.onend = () => setIsRecording(false);

    recognition.start();
    recognitionRef.current = recognition;
    setIsRecording(true);
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-3 text-[18px] rounded-full bg-blue-600 hover:bg-blue-700 text-white "
      >
        <RiVoiceprintLine/>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full h-full flex flex-col items-center justify-center text-white"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <button
                onClick={() => {
                  setOpen(false);
                  stopRecording();
                }}
                className="absolute top-6 right-6 text-gray-300 hover:text-white"
              >
               <FaTimes/>
              </button>

              <motion.div
                className="relative flex items-center justify-center w-56 h-56 rounded-full overflow-hidden shadow-2xl"
                animate={{
                  scale: isRecording ? [1, 1.15, 1] : 1,
                  background: isRecording
                    ? [
                        "radial-gradient(circle at 30% 30%, #cde9ff, #007BFF 60%, #001f4d)",
                        "radial-gradient(circle at 70% 70%, #b5e0ff, #005BFF 60%, #001f4d)",
                      ]
                    : "radial-gradient(circle at 30% 30%, #a8d8ff, #007BFF 70%, #001f4d)",
                }}
                transition={{
                  duration: 3,
                  repeat: isRecording ? Infinity : 0,
                  ease: "easeInOut",
                }}
              >
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className="p-8 rounded-full bg-transparent text-white"
                >
                  {isRecording ? <FaStop className="text-[30px]"/> : <FaMicrophone className="text-[30px]"/>}
                </button>
              </motion.div>

              <motion.div
                className="mt-10 w-96 text-center text-lg text-gray-200"
                animate={{ opacity: [0, 1], y: [-10, 0] }}
                transition={{ delay: 0.3 }}
              >
                {transcript || "Start speaking to see your text here..."}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SlidePageSTT;

// SlidePageSTT.tsx
import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { RiVoiceprintLine } from "react-icons/ri";
import { FaMicrophone } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FaStop, FaTimes } from "react-icons/fa";


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


const SlidePageSTT: React.FC<{ sendMessage: (prompt: string) => void }> = ({ sendMessage }) => {


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
    if (transcript.trim() !== "")
      sendMessage(transcript.trim());
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-3 text-[18px] rounded-full bg-blue-600 hover:bg-blue-700 text-white "
      >
        <RiVoiceprintLine />
      </button>

      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center"
              style={{ 
                zIndex: 2147483647,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                stopRecording();
              }}
            >
            <motion.div
              className="relative w-full h-full flex flex-col items-center justify-center"
              style={{ 
                zIndex: 2147483647,
                position: 'relative',
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <button
                onClick={() => {
                  setOpen(false);
                  stopRecording();
                }}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors p-2"
              >
                <FaTimes className="text-xl" />
              </button>

              {/* Glowing multi-color ball */}
              <div 
                className="relative flex items-center justify-center w-80 h-80"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {/* Outer pulsing colored circles */}
                {isRecording && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "radial-gradient(circle, rgba(255,0,150,0.4), rgba(0,150,255,0.4), rgba(150,255,0,0.4))",
                        filter: "blur(20px)",
                      }}
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ 
                        scale: [1, 1.8, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "radial-gradient(circle, rgba(0,255,150,0.4), rgba(255,100,0,0.4), rgba(150,0,255,0.4))",
                        filter: "blur(20px)",
                      }}
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ 
                        scale: [1, 1.8, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 0.8,
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "radial-gradient(circle, rgba(255,200,0,0.4), rgba(0,200,255,0.4), rgba(255,0,100,0.4))",
                        filter: "blur(20px)",
                      }}
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ 
                        scale: [1, 1.8, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 1.6,
                      }}
                    />
                  </>
                )}

                {/* Main glowing ball button */}
                <motion.button
                  onClick={isRecording ? stopRecording : startRecording}
                  className="relative z-10 w-40 h-40 rounded-full flex items-center justify-center overflow-hidden"
                  style={{
                    background: isRecording
                      ? "linear-gradient(135deg, #ff006e, #8338ec, #3a86ff, #06ffa5, #ffbe0b, #fb5607, #ff006e)"
                      : "linear-gradient(135deg, #667eea, #764ba2, #f093fb, #4facfe, #00f2fe)",
                    backgroundSize: isRecording ? "400% 400%" : "200% 200%",
                    boxShadow: isRecording
                      ? "0 0 60px rgba(255, 0, 150, 0.8), 0 0 100px rgba(0, 150, 255, 0.6), 0 0 140px rgba(150, 255, 0, 0.4), inset 0 0 40px rgba(255, 255, 255, 0.2)"
                      : "0 0 40px rgba(102, 126, 234, 0.6), 0 0 80px rgba(118, 75, 162, 0.4), inset 0 0 30px rgba(255, 255, 255, 0.1)",
                  }}
                  animate={
                    isRecording
                      ? {
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                          scale: [1, 1.05, 1],
                        }
                      : {
                          backgroundPosition: ["0% 50%", "100% 50%"],
                          scale: 1,
                        }
                  }
                  transition={
                    isRecording
                      ? {
                          backgroundPosition: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          },
                          scale: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }
                      : {
                          backgroundPosition: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear",
                          },
                        }
                  }
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Inner glow effect */}
                  <div
                    className="absolute inset-4 rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)",
                      filter: "blur(10px)",
                    }}
                  />
                  
                  {/* Icon */}
                  <div className="relative z-10">
                    {isRecording ? (
                      <FaStop className="text-white text-3xl drop-shadow-lg" />
                    ) : (
                      <FaMicrophone className="text-white text-3xl drop-shadow-lg" />
                    )}
                  </div>
                </motion.button>
              </div>

              {/* Transcript text */}
              <motion.div
                className="mt-12 w-[600px] max-w-[90vw] text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <p className="text-white text-lg leading-relaxed">
                  {transcript || (
                    <span className="text-gray-400">Start speaking to see your text here...</span>
                  )}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </>
  );
};

export default SlidePageSTT;

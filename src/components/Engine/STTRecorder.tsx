// SlidePageSTT.tsx
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { RiVoiceprintLine } from "react-icons/ri";
import { FaMicrophone, FaVolumeUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FaStop, FaTimes } from "react-icons/fa";
import useWebSocket from "@/hooks/useWebSocket";


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

type VoiceState = 'idle' | 'listening' | 'processing' | 'speaking';

const SlidePageSTT: React.FC<{ sendMessage: (prompt: string) => void }> = ({ sendMessage }) => {

  const [open, setOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [responseText, setResponseText] = useState("");
  const recognitionRef = useRef<SpeechRecognitionCustom | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const responseTextRef = useRef<string>("");
  const currentCounterRef = useRef<string>("");
  const {socket, responseRef} = useWebSocket();

  // Listen to WebSocket messages for voice-to-voice
  useEffect(() => {
    if (!socket || !open) return;

    const onReceiveMessage = (data: any) => {
      if (voiceState === 'processing') {
        // Accumulate response text
        responseTextRef.current += data.message;
        setResponseText(responseTextRef.current);
      }
    };

    const onResponseDone = (data: { message: string }) => {
      if (data.message === 'done#' && voiceState === 'processing') {
        // Get final text from responseRef (which is updated in PromptYard) or accumulated text
        const finalText = (responseRef?.current && responseRef.current.trim()) 
          ? responseRef.current 
          : responseTextRef.current;
        
        if (finalText && finalText.trim()) {
          speakResponse(finalText);
        } else {
          setVoiceState('idle');
          responseTextRef.current = "";
          setResponseText("");
        }
      }
    };

    socket.on('receive_message', onReceiveMessage);
    socket.on('response_done', onResponseDone);

    return () => {
      socket.off('receive_message', onReceiveMessage);
      socket.off('response_done', onResponseDone);
    };
  }, [socket, open, voiceState, responseRef]);

  const speakResponse = (text: string) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      setVoiceState('idle');
      return;
    }

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    // Clean text for better speech (remove markdown, URLs, etc.)
    const cleanText = text
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove markdown links
      .replace(/https?:\/\/[^\s]+/g, '') // Remove URLs
      .replace(/\*\*([^\*]+)\*\*/g, '$1') // Remove bold markdown
      .replace(/\*([^\*]+)\*/g, '$1') // Remove italic markdown
      .replace(/#{1,6}\s/g, '') // Remove headers
      .trim();

    if (!cleanText) {
      setVoiceState('idle');
      return;
    }

    setVoiceState('speaking');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onend = () => {
      setVoiceState('idle');
      responseTextRef.current = "";
      setResponseText("");
    };

    utterance.onerror = (error) => {
      console.error('Speech synthesis error:', error);
      setVoiceState('idle');
      responseTextRef.current = "";
      setResponseText("");
    };

    speechSynthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setVoiceState('idle');
    responseTextRef.current = "";
    setResponseText("");
  };

  const startRecording = () => {
    // Stop any ongoing speech
    stopSpeaking();

    socket?.emit("start_audio", {
      sessionId: localStorage.getItem("sessionId")
    });

    // Use browser's Speech Recognition API as fallback
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
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

      recognition.onerror = (e: any) => {
        console.error('Speech recognition error:', e);
        if (e.error === 'no-speech') {
          // User stopped speaking, auto-stop after a delay
          setTimeout(() => {
            if (isRecording) {
              stopRecording();
            }
          }, 2000);
        }
      };

      recognition.onend = () => {
        if (isRecording) {
          // Restart if still recording (continuous mode)
          try {
            recognition.start();
          } catch (e) {
            console.error('Failed to restart recognition:', e);
          }
        }
      };

      try {
        recognition.start();
        recognitionRef.current = recognition;
        setIsRecording(true);
        setVoiceState('listening');
      } catch (e) {
        console.error('Failed to start recognition:', e);
      }
    } else {
      // Fallback: just show recording state
      setIsRecording(true);
      setVoiceState('listening');
    }
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
    
    if (transcript.trim() !== "") {
      // Reset response tracking
      responseTextRef.current = "";
      setResponseText("");
      currentCounterRef.current = localStorage.getItem('counter') || "";
      
      // Send message and wait for response
      setVoiceState('processing');
      const messageToSend = transcript.trim();
      setTranscript(""); // Clear transcript after sending
      sendMessage(messageToSend);
    } else {
      setVoiceState('idle');
    }
  };

  // Cleanup: stop speaking when modal closes
  useEffect(() => {
    if (!open) {
      stopSpeaking();
      setVoiceState('idle');
    }
  }, [open]);

  const handleClose = () => {
    stopSpeaking();
    stopRecording();
    setOpen(false);
    setVoiceState('idle');
    setTranscript("");
    setResponseText("");
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
              className="fixed inset-0 bg-zinc-100 backdrop-blur-sm flex items-center justify-center"
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
                if (voiceState === 'speaking') {
                  stopSpeaking();
                } else {
                  stopRecording();
                }
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
                onClick={handleClose}
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
                {(isRecording || voiceState === 'speaking') && (
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
                  onClick={
                    voiceState === 'speaking' 
                      ? stopSpeaking 
                      : isRecording 
                      ? stopRecording 
                      : startRecording
                  }
                  className="relative z-10 w-40 h-40 rounded-full flex items-center justify-center overflow-hidden"
                  style={{
                    background: 
                      voiceState === 'speaking'
                        ? "linear-gradient(135deg, #06ffa5, #3a86ff, #8338ec, #ff006e, #06ffa5)"
                        : isRecording
                        ? "linear-gradient(135deg, #ff006e, #8338ec, #3a86ff, #06ffa5, #ffbe0b, #fb5607, #ff006e)"
                        : voiceState === 'processing'
                        ? "linear-gradient(135deg, #ffbe0b, #fb5607, #ff006e, #8338ec, #ffbe0b)"
                        : "linear-gradient(135deg, #667eea, #764ba2, #f093fb, #4facfe, #00f2fe)",
                    backgroundSize: (isRecording || voiceState === 'speaking' || voiceState === 'processing') ? "400% 400%" : "200% 200%",
                    boxShadow: 
                      voiceState === 'speaking'
                        ? "0 0 60px rgba(6, 255, 165, 0.8), 0 0 100px rgba(58, 134, 255, 0.6), 0 0 140px rgba(131, 56, 236, 0.4), inset 0 0 40px rgba(255, 255, 255, 0.2)"
                        : isRecording
                        ? "0 0 60px rgba(255, 0, 150, 0.8), 0 0 100px rgba(0, 150, 255, 0.6), 0 0 140px rgba(150, 255, 0, 0.4), inset 0 0 40px rgba(255, 255, 255, 0.2)"
                        : voiceState === 'processing'
                        ? "0 0 60px rgba(255, 190, 11, 0.8), 0 0 100px rgba(251, 86, 7, 0.6), 0 0 140px rgba(255, 0, 110, 0.4), inset 0 0 40px rgba(255, 255, 255, 0.2)"
                        : "0 0 40px rgba(102, 126, 234, 0.6), 0 0 80px rgba(118, 75, 162, 0.4), inset 0 0 30px rgba(255, 255, 255, 0.1)",
                  }}
                  animate={
                    (isRecording || voiceState === 'speaking' || voiceState === 'processing')
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
                    (isRecording || voiceState === 'speaking' || voiceState === 'processing')
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
                    {voiceState === 'speaking' ? (
                      <FaVolumeUp className="text-white text-3xl drop-shadow-lg" />
                    ) : isRecording ? (
                      <FaStop className="text-white text-3xl drop-shadow-lg" />
                    ) : voiceState === 'processing' ? (
                      <motion.div
                        className="w-8 h-8 border-4 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <FaMicrophone className="text-white text-3xl drop-shadow-lg" />
                    )}
                  </div>
                </motion.button>
              </div>

              {/* Transcript and Response text */}
              <motion.div
                className="mt-12 w-[600px] max-w-[90vw] text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {transcript && (
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-2">You said:</p>
                    <p className="text-white text-lg leading-relaxed">{transcript}</p>
                  </div>
                )}
                {voiceState === 'processing' && (
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Processing...</p>
                    {responseText && (
                      <p className="text-white text-lg leading-relaxed opacity-70">{responseText}</p>
                    )}
                  </div>
                )}
                {voiceState === 'speaking' && responseText && (
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Response:</p>
                    <p className="text-white text-lg leading-relaxed">{responseText}</p>
                  </div>
                )}
                {!transcript && voiceState === 'idle' && (
                  <p className="text-gray-400 text-lg">
                    {isRecording 
                      ? "Listening..." 
                      : "Start speaking to see your text here..."}
                  </p>
                )}
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

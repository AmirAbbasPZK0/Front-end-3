"use client"

import React, { useState, useRef, useEffect } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import { motion } from "framer-motion";

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

interface DictateProps {
  onTextChange?: (text: string) => void;
  onTranscript?: (text: string) => void;
  onRecordingChange?: (isRecording: boolean) => void;
  className?: string;
  placeholder?: string;
  autoStart?: boolean;
}

export default function Dictate({ 
  onTextChange, 
  onTranscript,
  onRecordingChange,
  className = "",
  placeholder = "Click the microphone to start dictating...",
  autoStart = false
}: DictateProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionCustom | null>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTranscriptRef = useRef<string>("");

  const startRecording = () => {
    if (!isSupported) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEventCustom) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      const fullTranscript = finalTranscript + interimTranscript;
      setTranscript(fullTranscript);
      lastTranscriptRef.current = fullTranscript;
      
      // Clear existing timeout
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
      
      // Call callbacks
      if (onTextChange) {
        onTextChange(fullTranscript);
      }
      
      // If we have final results, call onTranscript immediately
      if (onTranscript && finalTranscript.trim()) {
        onTranscript(finalTranscript.trim());
        // Auto-stop after sending final transcript
        setTimeout(() => {
          stopRecording();
        }, 100);
      } else if (fullTranscript.trim()) {
        // If we have interim results, set a timeout to auto-send after silence
        // This detects when user stops speaking
        silenceTimeoutRef.current = setTimeout(() => {
          // Only send if transcript hasn't changed (user stopped speaking)
          const currentTranscript = lastTranscriptRef.current;
          if (currentTranscript === fullTranscript && currentTranscript.trim()) {
            if (onTranscript) {
              onTranscript(currentTranscript.trim());
            }
            // Auto-stop after sending
            stopRecording();
          }
        }, 2000); // 2 seconds of silence = user finished speaking
      }
    };

    recognition.onerror = (e: any) => {
      console.error("Speech recognition error:", e);
      if (e.error === "not-allowed") {
        alert("Microphone permission denied. Please enable microphone access.");
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
      setIsRecording(true);
      if (onRecordingChange) {
        onRecordingChange(true);
      }
    } catch (e) {
      console.error("Failed to start recognition:", e);
      setIsRecording(false);
      if (onRecordingChange) {
        onRecordingChange(false);
      }
    }
  };

  useEffect(() => {
    // Check if speech recognition is supported
    const supported = "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
    setIsSupported(supported);

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (autoStart && isSupported) {
      startRecording();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart, isSupported]);

  const stopRecording = () => {
    // Clear silence timeout
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsRecording(false);
    if (onRecordingChange) {
      onRecordingChange(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Dynamic wave animation component
  const WaveAnimation = () => {
    if (!isRecording) return null;

    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-2 border-blue-500"
            style={{
              width: 40,
              height: 40,
            }}
            animate={{
              scale: [1, 2.5, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    );
  };

  if (!isSupported) {
    return (
      <button 
        className={`text-[20px] p-1 opacity-50 cursor-not-allowed ${className}`}
        type='button'
        title="Voice input not supported"
        disabled
      >
        <FaMicrophone />
      </button>
    );
  }

  return (
    <div className={`relative inline-block ${className}`}>
      <WaveAnimation />
      <button 
        onClick={toggleRecording}
        className={`relative z-10 text-[20px] p-1 hover:opacity-70 transition-opacity ${
          isRecording ? 'text-red-500' : ''
        }`}
        type='button'
        title={isRecording ? "Stop recording" : "Start voice input"}
      >
        {isRecording ? (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <FaStop />
          </motion.div>
        ) : (
          <FaMicrophone />
        )}
      </button>
    </div>
  );
}

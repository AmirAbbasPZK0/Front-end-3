'use client';

import { useState, useEffect, useRef } from 'react';
import { MdOutlineKeyboardVoice , MdKeyboardVoice } from "react-icons/md";

type SpeechRecognitionType = typeof window.SpeechRecognition;

export default function SpeechToText({sendMessage} : {sendMessage : (message : string) => void}) {
  const [transcript, setTranscript] = useState('');
  const [isListening , setIsListening] = useState(false)
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window.SpeechRecognition || window.webkitSpeechRecognition) as SpeechRecognitionType | undefined;

      if (!SpeechRecognition) {
        alert('SpeechRecognition is not supported in your browser');
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onresult = (event: any) => {
        const speechResult = event.results[0][0].transcript;
        setTranscript(speechResult);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = () => {
    recognitionRef.current?.start();
    setIsListening(item => !item)
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(item => !item)
    sendMessage(transcript)
    setTranscript("")
  }

  return (
    <div className="p-1">
      <button onClick={isListening ? stopListening : startListening} className="text-[25px]">
        {!isListening ? <MdOutlineKeyboardVoice/> : <MdKeyboardVoice/>}
      </button>
    </div>
  );
}

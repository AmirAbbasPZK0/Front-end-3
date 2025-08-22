'use client';

import { usePathname } from 'next/navigation';
import React, { createContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

interface Response {
  text: any,
  isLoading: boolean,
  isDone : boolean,
  images: any,
  data: any,
  videos : any,
  findoraMessage : any,
  relatedQuestions: any
}

interface WebSocketContextType {
  socket: any;
  isConnected: boolean;
  response: {} | Response;
  setResponse: any;
  responseRef: any;
  findoraMessageRef : any;
}

export const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

const WebSocketProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<any>(null);
  const [response, setResponse] = useState({});
  const responseRef = useRef<string>('');
  const findoraMessageRef = useRef<string>("")

  const pathname = usePathname()
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_BASE_URL, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ["websocket"],
      withCredentials : true,
      timeout: 600000, // 60 second,
      // auth: {
      //   Authorization: `Bearer ${Cookies.get("access_token")}`,
      // },
    });

    const sendErrorToTelegram = async (message : any) => {
      try{
        const res = await fetch("/api/notify-telegram" , {
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({message})
        })
        const result = await res.json()
        console.log(result)
      }catch(err){
        console.log(err)
      }
    };

    socket.on('connected', () => {
      setIsConnected(true);
    });

    socket.on('connect_error', (err) => {
      console.log("Connect Error" , err.message)
      setIsConnected(false);
      sendErrorToTelegram(err.message)
    });

    socket.on("error" , (err)=>{
      console.log("Error" , JSON.stringify(err))
      console.log("This is error" , err)
    })

    socketRef.current = socket;

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (pathname == '/'){
      setResponse({})
    }
  }, [pathname]);

  return (
    <WebSocketContext.Provider value={{
      socket: socketRef.current,
      isConnected,
      response,
      setResponse,
      responseRef,
      findoraMessageRef
    }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
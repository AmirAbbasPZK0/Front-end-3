'use client';

import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';
import React, { createContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

interface WebSocketContextType {
  socket: any;
  isConnected: boolean;
  response: any;
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
      timeout: 600000, // 60 second,
      extraHeaders: {
        Authorization: `Bearer ${Cookies.get('access_token')}`
      }
    });

    socket.on('connected', (data) => {
      setIsConnected(true);
    });

    socket.on('connect_error', () => {
      setIsConnected(false);
    });

    socketRef.current = socket;

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (pathname == '/search'){
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
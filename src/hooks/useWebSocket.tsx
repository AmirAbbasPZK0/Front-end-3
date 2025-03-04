import { WebSocketContext } from '@/contexts/WebSocketContext';
import { useContext } from 'react';

const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

export default useWebSocket;
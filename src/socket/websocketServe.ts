import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const WebsocketServe = (): Socket | null => {
    let websocketUrl = import.meta.env.VITE_WEBSOCKET_API_URL;
    const [socket, setSocket] = useState<Socket | null>(null);
    
    useEffect(() => {
        const socketInstance = io(websocketUrl, {
            transports: ['websocket'],
            upgrade: false
        });
        setSocket(socketInstance);
        return () => {
            socketInstance.disconnect();
        };
    }, []);
    return socket;
};
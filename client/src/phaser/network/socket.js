import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL, {
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5
});

export default socket;

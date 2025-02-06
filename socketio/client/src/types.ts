// socketSingleton.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocketInstance = (): Socket => {
  if (!socket) {
    socket = io("http://localhost:4000");
  }
  return socket;
};

export type Message = {
  room: string;
  message: string;
};

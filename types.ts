import { Socket } from 'socket.io';

export type Client = {
  socket: Socket;
  userId: string;
  radius: number;
};

export type SearchingModel = {
  type: string;
  userId: string;
  kilometers: number;
};

export type MesssageModel = {
  userId: string;
  message: string;
};

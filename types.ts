import { Socket } from 'socket.io';

export type Client = {
  socket: Socket;
  userId: string;
  radius: number;
  notFoundTimeout: NodeJS.Timeout;
};

export type SearchingModel = {
  userId: string; //TODO: we can use socket itself instead of userId
  kilometers: number;
};

export type MesssageModel = {
  userId: string;
  message: string;
};

export type updateLocationModel = {
  userId: string;
  lat: number;
  lot: number;
};

import { Socket } from 'socket.io';
import { chatRoomFoundEvent } from '../../eventConstants';
import { IUser } from '../../models/user.model';

export default (socket: Socket, chatRoomId: string, dist: number, userA: IUser | null, userB: IUser | null) => {
  socket.emit(chatRoomFoundEvent, {
    chatRoomId,
    dist,
    userA,
    userB,
  });
};

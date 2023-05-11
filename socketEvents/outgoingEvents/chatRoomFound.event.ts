import { Socket } from 'socket.io';
import { startSearchingEvent } from '../../eventConstants';
import { IUser } from '../../models/user.model';

export default (socket: Socket, chatRoomId: string, dist: number, userA: IUser | null, userB: IUser | null) => {
  socket.emit(startSearchingEvent, {
    chatRoomId,
    dist,
    userA,
    userB,
  });
};

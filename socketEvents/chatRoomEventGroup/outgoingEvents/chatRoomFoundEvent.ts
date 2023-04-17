import { Socket } from 'socket.io';
import { chatRoomFoundEvent, userEventGroup } from '../../../eventConstants';

export default (socket: Socket, chatRoomId: string, dist: number) => {
  socket.emit(userEventGroup, {
    type: chatRoomFoundEvent,
    chatRoomId: chatRoomId,
    partnerDistance: dist,
  });
};

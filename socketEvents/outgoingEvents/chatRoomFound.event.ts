import { Socket } from 'socket.io';
import { chatRoomFoundEvent, startSearchingEvent } from '../../eventConstants';

export default (socket: Socket, chatRoomId: string, dist: number) => {
  socket.emit(startSearchingEvent, {
    type: chatRoomFoundEvent,
    chatRoomId: chatRoomId,
    partnerDistance: dist,
  });
};

import { model, Schema, Model, Document } from 'mongoose';

interface IChatRoom extends Document {
  dateCreated: number;
}

const chatRoomSchema = new Schema<IChatRoom>({
  dateCreated: {
    type: Number,
  },
});

export const ChatRoom: Model<IChatRoom> = model('ChatRoomModel', chatRoomSchema);

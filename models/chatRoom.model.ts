import { model, Schema, Model, Document } from 'mongoose';

export interface IChatRoom extends Document {
  dateCreated: number;
  isGameOn: boolean;
  chatRoomId: string;
}

const chatRoomSchema = new Schema<IChatRoom>({
  dateCreated: {
    type: Number,
  },
  isGameOn: {
    type: Boolean,
    default: false,
  },
  chatRoomId: {
    type: String,
  },
});

export const ChatRoom: Model<IChatRoom> = model('ChatRoomModel', chatRoomSchema);

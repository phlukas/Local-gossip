import { model, Schema, Model, Document } from 'mongoose';

interface IMessage extends Document {
  dateCreated?: number;
  chatRoomId?: string;
  content?: string;
  senderId?: string;
}

const messageSchema = new Schema<IMessage>({
  dateCreated: {
    type: Number,
  },
  chatRoomId: {
    type: String,
  },
  content: {
    type: String,
  },
  senderId: {
    type: String,
  },
});

export const Message: Model<IMessage> = model('MessageModel', messageSchema);

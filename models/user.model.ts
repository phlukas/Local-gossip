import { model, Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
  dateCreated?: number;
  name?: string;
  email?: string;
  password?: string;
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
  invisibleUntil?: number;
  frozenUntil?: number;
  selectedRadius?: number;
  chatRoomId?: string;
  socketId?: string;
  isAdmin?: boolean;
}

const userSchema = new Schema<IUser>({
  dateCreated: {
    type: Number,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  invisibleUntil: {
    type: Date,
  },
  frozenUntil: {
    type: Date,
  },
  selectedRadius: {
    type: Number,
  },
  chatRoomId: {
    type: String,
  },
  socketId: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
});

export const User: Model<IUser> = model('UserModel', userSchema);

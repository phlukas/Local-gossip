import { model, Schema, Model, Document } from 'mongoose';

interface ILocation extends Document {
  dateCreated: number;
  chatroom: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  name: string;
}

const locationSchema = new Schema<ILocation>({
  dateCreated: {
    type: Number,
  },
  chatroom: {
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
  name: {
    type: String,
  },
});

export const Location: Model<ILocation> = model('LocationModel', locationSchema);

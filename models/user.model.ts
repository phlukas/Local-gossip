import { model, Schema, Model, Document } from "mongoose";

export interface IUser extends Document {
    dateCreated?: number;
    name?: string;
    email?: string;
    password?: string;
    imageUrl?: string;
    rank?: string;
    latitude?: number;
    longitude?: number;
    selectedRadius?: number;
    showLocation?: boolean;
    showProfile?: boolean;
    chatRoomId?: string;
    socketId?: string;
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
    rank: {
        type: String,
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },
    selectedRadius: {
        type: Number,
    },
    showLocation: {
        type: Boolean,
    },
    showProfile: {
        type: Boolean,
    },
    chatRoomId: {
        type: String,
    },
    socketId: {
        type: String,
    },
});

export const User: Model<IUser> = model("UserModel", userSchema);

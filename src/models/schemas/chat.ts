import mongoose from 'mongoose';
export const messageCollectionName = 'message';

export interface IMessage {
  author: {
    email: String;
    nombre: String,
    apellido: String,
    alias: String,
    edad: Number,
    avatar: String
  },
  mensaje: { type: String, required: true, max: 1000 },
}

const messageSchema = new mongoose.Schema<IMessage>({
  author: {
    email: { type: String, required: true, max: 50 },
    nombre: { type: String, required: true, max: 50 },
    apellido: { type: String, required: true, max: 50 },
    alias: { type: String, required: true, max: 50 },
    edad: { type: Number, required: true },
    avatar: { type: String, required: true, max: 50 },
  },
  mensaje: { type: String, required: true, max: 1000 },
},
  { versionKey: false });

export const MessageModel = mongoose.model<IMessage>(messageCollectionName, messageSchema);
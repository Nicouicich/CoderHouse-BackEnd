import {Schema, model } from "mongoose";
import mongoose from "mongoose";


export const categoryCollectionName = 'user';
export interface IUser {
  username: string;
  password: string;
  admin: boolean;
} 

const UserSchema = new mongoose.Schema<IUser>({
  username: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  admin: {type:Boolean, default:false}
})
export const UserModel = mongoose.model<IUser>(categoryCollectionName, UserSchema);

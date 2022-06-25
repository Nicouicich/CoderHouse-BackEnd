import {Schema, model } from "mongoose";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';


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

UserSchema.pre('save', async function(next: any) {
  const user = this
  const hash = await bcrypt.hash(user.password,10)
  this.password = hash
  next()
})

UserSchema.methods.isValidPassword = async function (password: Buffer) {
  const user = this
  const compare = await bcrypt.compare(password,user.password)
  return compare

}
export const UserModel = mongoose.model<IUser>(categoryCollectionName, UserSchema);

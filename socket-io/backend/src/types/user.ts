import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  surname: string;
  username: string;
  email: string;
  profilePic?: string;
  followers: mongoose.Schema.Types.ObjectId[];
  following: mongoose.Schema.Types.ObjectId[];
  savedPosts?: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
}

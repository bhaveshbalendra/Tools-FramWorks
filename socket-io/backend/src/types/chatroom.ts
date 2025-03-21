import mongoose, { Document } from "mongoose";

export interface IChatRoom extends Document {
  members: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
}

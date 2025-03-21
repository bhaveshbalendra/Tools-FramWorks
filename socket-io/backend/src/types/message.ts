import mongoose from "mongoose";
import { ObjectId } from "./../../node_modules/bson/src/objectid";
import { IChatRoom } from "./chatroom";
import { IUser } from "./user";

export interface IMessage extends Document {
  sender: IUser;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isRead: boolean;
  chatRoom: IChatRoom;
  attachment: string;
  replayTo?: mongoose.Schema.Types.ObjectId;
}

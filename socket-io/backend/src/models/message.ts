import mongoose, { Schema } from "mongoose";
import { IMessage } from "../types/message";

const messageSchema = new mongoose.Schema<IMessage>({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
  },
  chatRoom: {
    type: Schema.Types.ObjectId,
    ref: "ChatRoom",
  },
  attachment: {
    type: String,
  },
  replayTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

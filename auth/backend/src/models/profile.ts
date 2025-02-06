import mongoose from "mongoose";
import { IProfile } from "../types/profile";

const profileSchema = new mongoose.Schema<IProfile>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model<IProfile>("profile", profileSchema);

export default Profile;

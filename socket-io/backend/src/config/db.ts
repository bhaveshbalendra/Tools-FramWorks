import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const res = await mongoose.connect(
      "mongodb+srv://balendrabhavesh:User%4098@meantforlearn.drlojsk.mongodb.net/socket-io?retryWrites=true&w=majority&appName=MeantForLearn"
    );
    console.log("Mongo db connected");
  } catch (error: any) {
    if (error) {
      throw new Error("Unexpected Error at Server");
    }
  }
};

import mongoose from "mongoose";

export const dbConnect = async () => {
  mongoose.set("strictQuery", false);

  if (!process.env.MONGODB_URL) {
    return console.log("Mongodb Url Not Found");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
  }
};

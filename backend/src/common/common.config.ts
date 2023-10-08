import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url: string =
  process.env.MONGODB_URI ||
  "mongodb+srv://user:user123@divlink.hx9ld8w.mongodb.net/devLink_db?retryWrites=true&w=majority";

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  await mongoose
    .connect(url)
    .then(() => {
      console.log(`DATABASE CONNECTED..!!`);
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export { connectDB };

import mongoose from "mongoose";
import { _config } from "./config";
import redisClient from "./redisDB";

// mongoose.set("strictQuery",false)

async function connectDB() {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Db Connected");
    });
    mongoose.connection.on("error", function () {
      console.log("Db connection Error");
    });
    await mongoose.connect(_config.MONGO_URL);
   

    
  } catch (error) {
    console.error("Database not connected", error);
    process.exit(1);
  }
}

export default connectDB;

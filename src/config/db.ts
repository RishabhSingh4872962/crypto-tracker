import mongoose from "mongoose";
import { _config } from "./config";

// mongoose.set("strictQuery",false)

async function connectDB() {
  try {
    await mongoose.connect(_config.MONGO_URL);
    mongoose.connection.on("connected", () => {
      console.log("Db Connected");
    });

    mongoose.connection.on("error", function () {
      console.log("Db connection Error");
    });
  } catch (error) {
    console.error("Database not connected", error);
    process.exit(1);
  }
}

export default connectDB;

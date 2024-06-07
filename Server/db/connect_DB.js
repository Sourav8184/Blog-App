// Import modules:
import dotenv from "dotenv";
import mongoose from "mongoose";

// .env configration:
dotenv.config({
  path: "./.env",
});

// Connnect Database method:
const connect_DB = async () => {
  try {
    console.log(process.env.MONGODB_ATLAS, process.env.DB_NAME);
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_ATLAS}/${process.env.DB_NAME}`
    );

    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export { connect_DB };

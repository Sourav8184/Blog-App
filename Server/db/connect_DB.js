// Import modules:

import mongoose from "mongoose";

// Connnect Database method:
const connect_DB = async () => {
  try {
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

export default connect_DB;

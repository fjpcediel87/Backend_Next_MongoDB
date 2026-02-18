import mongoose, { mongo } from "mongoose";

//import { DB_NAME } from "./constants.js";

const connectDB = async () => {
    try {
        
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`\nMongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);

    }

}
export default connectDB;
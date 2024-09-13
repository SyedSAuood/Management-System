import mongoose from "mongoose";

const ConnectToDB = async () =>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/ManagementSystem");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB");
    }
}

export default ConnectToDB;
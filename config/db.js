import mongoose from "mongoose";
const connectDb = async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"Ai-study-assistant",
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.error(`Error:${error.message}`);
        process.exit(1);
    }
};
export default connectDb;
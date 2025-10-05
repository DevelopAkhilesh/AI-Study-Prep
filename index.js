import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import studyRoutes from "./routes/studyRoute.js";



const app = express();

app.use(express.json());
app.use(cors({
    origin:process.env.FRONTEND,
    credentials:true,
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}))

// port numer
const PORT = process.env.PORT||7000;

app.get('/',(req,res)=>{
    res.send('backend is running....');
});
//* conection to db
connectDb();
//*routes

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/study",studyRoutes);



app.listen(PORT,()=>console.log(`server is running at port ${PORT}`));


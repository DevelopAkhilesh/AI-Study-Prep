import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { generateStudy,history } from "../controllers/studyController.js";

const studyRoute = express.Router();

studyRoute.post("/generate-study-material",protect,generateStudy);
studyRoute.get("/history",protect,history);

export default studyRoute;
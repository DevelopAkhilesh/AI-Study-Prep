import { generateStudyMaterial,studyHistory } from "../services/studyService.js"


 export const generateStudy = async(req,res)=>{
    try {
        const {text} = req.body;
        if(!text)return res.status(400).json({error:"No input is provided"});
        const data = await generateStudyMaterial(text,req.user._id);
        res.json({data:data});
    } catch (error) {
        res.status(500).json({error:error.message || "Failed to generate study material"});
    }
 };
 export const history =async(req,res)=>{
    try {
        const data = await studyHistory(req.user._id);
        res.json({data:data});
    } catch (error) {
        res.status(500).json({error:"Failed to fetch history"});
    }
 }
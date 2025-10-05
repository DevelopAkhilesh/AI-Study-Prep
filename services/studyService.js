import dotenv from "dotenv";
dotenv.config();
import studySession from "../models/studySession.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
// import { text } from "body-parser";

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({model:"gemini-2.5-flash"});


export const generateStudyMaterial = async (text,userId)=> {
    const prompt =`
Summarize the following notes and create a practice quiz.
Return ONLY valid JSON (no markdown, no extra text).

JSON format:
{
  "summary": ["point1", "point2", "point3", ...],
  "quiz": [
    {
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "correct": "A"
    }
  ]
}

Notes:
${text}
`;

  
    const result = await model.generateContent(prompt);
    let output = await result.response.text();

    output = output.replace(/```json|```/g, "").trim();

    let parsed;
    try{
        parsed = JSON.parse(output);
    }catch(e){
        throw new Error("AI response was not valid");
    }

    const StudySession = await studySession.create({
        user:userId,
        inputText:text,
        summary:parsed.summary,
        quiz:parsed.quiz
    });
    return StudySession;
  
    
  };

  export const studyHistory = async(userId)=>{
    return  await studySession.find({user:userId}).sort({createdAt:-1}).limit(10);
    

  }
  
  
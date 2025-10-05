import { registerUser,loginUser } from "../services/authService.js";

 export const register = async(req,res)=>{
    try {
        const user = await registerUser(req);
        
        return res.status(201).json({
            success: true,
            message:"User created Successfully",
            data:user
        })
    } catch (error) {
        res.status(400).json({error: error.message||"Registration Failed"});
    }
    
};

export const login = async(req,res)=>{
    try {
        const user = await loginUser(req);
        
        return res.status(201).json({
            sucess:true,
            message:"User Login Successfully",
            data:user
        })
    } catch (error) {
        res.status(400).json({ error: error.message || "Login failed" });
    }
}


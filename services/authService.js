import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";


const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"7d"});

};

export const registerUser = async (req)=>{

    const {name,email,password} = req.body;

    const userExist = await User.findOne({email});
    if(userExist)throw new Error("User already exist");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const user = await User.create({name,email,password:hashedPassword});

    
    return {
        _id:user._id,
        name:user.name,
        email:user.email,
        token:generateToken(user._id)
    };
}



 export const loginUser =  async(req)=>{
    const {email,password}= req.body;

    const user = await User.findOne({email});
    if(!user) throw new Error("Invalid Credentials");

    const userPassword = await bcrypt.compare(password,user.password);
    if(!userPassword) throw new Error("Invalid Credentials");

    return{
        _id:user._id,
        name:user.name,
        email:user.email,
        token:generateToken(user._id)

    }
}



import {Request , Response} from 'express';
import User from '../models/User';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export const registerUser = async (req:Request , res: Response) =>{
    
    
    const {username , email , password , confirmPassword} = req.body;
    try {
        const CheckUser = await User.findOne({UserName: username});

        if(CheckUser){
           return res.status(400).json({ success: false, message: "User Already Exist"});

        }

        const saltround : number = 12;
        const hashedPasword = await bcrypt.hash(password , saltround);
        const hashedConfirmPasword = await bcrypt.hash(confirmPassword , saltround);


        const user = new User({
            UserName : username,
            Email : email,
            Role: "User",
            Password : hashedPasword,
            ConfirmPassword : hashedConfirmPasword,
        })

         await user.save();

        
        return  res.status(200).json({ success: true, message: "User created successfully" });
    } catch (error) {
        return  res.status(500).json({ success: false ,  message: "Error Occured TRY AGAIN"});
    }

}

export const loginUser = async (req:Request , res:Response) =>{
  
    try {
        const {username , email, password, role} = req.body;

        const checkUser = await User.findOne({UserName:username,Email : email});

        if(!checkUser){
            return res.status(400).json({ success: false , message: "User Not found"});
        }
        
        const match = await bcrypt.compare(password , checkUser.Password);

        if(match){
            const user  = {username : username , role : checkUser.Role};
            const secretkey : string = 'secretkey';
            const token = jwt.sign(user , secretkey , {expiresIn : '1h'});

            res.cookie('token',token,{
                httpOnly: true,
                secure: true,
                maxAge: 3600000,
                sameSite: 'strict',
                
            });

           return res.status(200).json({ success : true , username : username, userRole : checkUser.Role});
        }else{
            return res.status(400).json({ success: false , message: "Password donot Match"});
        }


    } catch (error) {
        return res.status(500).json({ success : false , message : 'Error Occured TRY AGAIN'})
    }
}

export const logoutUser = async(req:Request , res:Response) =>{
    try {
        res.clearCookie('token',{
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        })
        res.status(200).json({success: true , message: 'User Logout'})
    } catch (error) {
        res.status(500).json({success: false, message: "Error Occure"})
    }
}
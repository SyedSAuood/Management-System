import {Request , Response} from 'express';
import User from '../models/User';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export const registerUser = async (req:Request , res: Response) =>{
    
    console.log(req.body.formData);
    const {username , email , password , confirmPassword} = req.body.formData;
    try {
        const CheckUser = await User.findOne({UserName: username});

        if(CheckUser){
           return res.status(400).json({ success: false, error: "User Already Exist"});

        }

        const saltround : number = 12;
        const hashedPasword = await bcrypt.hash(password , saltround);
        const hashedConfirmPasword = await bcrypt.hash(confirmPassword , saltround);


        const user = new User({
            UserName : username,
            Email : email,
            Password : hashedPasword,
            ConfirmPassword : hashedConfirmPasword,
        })

        const saveuser = await user.save();

        
        return  res.status(200).json({ success: true, message: "User created successfully" });
    } catch (error ) {
        return  res.status(500).json({ success: false});
    }

}
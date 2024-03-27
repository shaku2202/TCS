const express=require('express');
const {UserModel}=require('../models/user.models');
const {blackListTokenModel}=require('../models/blacklist.models');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const userRouter=express.Router();

//user register
userRouter.post('/register',(req,res)=>{
    const {name,email,pass, role}=req.body;

    try{
        bcrypt.hash(pass,5,async(err,hash)=>{
           if(err){
            res.status(200).json({ error: err });
           }else{
            const user=new UserModel({name,email,pass:hash,role});
            await user.save();
            console.log(user);
            res.status(200).json({msg:"Hey! user You are successfully Register"});
           }
        })
    }
    catch(err){
        res.status(400).json({msg:err});
    }
})

//login
userRouter.post('/login',async(req,res)=>{
    const {email,pass}=req.body;
    try{
       const user = await UserModel.findOne({email});
       if(user){
        bcrypt.compare(pass,user.pass,(err,result)=>{
            if(result){
                const token=jwt.sign({userID:user._id},"Shashank",{expiresIn:"1d"});
                const refresh_token=jwt.sign({userID:user._id},"Shashank",{expiresIn:"7d"});
                res.status(200).json({msg:"Login Successfull!",token,refresh_token});
            }else{
                res.status(200).json({msg:"Wrong Password"});
            }
        })
       }
    }
    catch(err){
        res.status(400).json({msg:"Please register first, wrong Credential"});
        console.log(err);
    }
})

//logout
userRouter.get('/logout',async(req,res)=>{
    const token=req.headers.authorization?.split(" ")[1];
    try{
     const blacklist=new blackListTokenModel({token});
     await blacklist.save();
     res.status(200).json({msg:"Logged out"});
    }
    catch(err){
        res.status(400).json({error:"err"})
    }
})





module.exports={
    userRouter,
}
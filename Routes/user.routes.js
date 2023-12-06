const express = require("express")
const {UserModel} = require("../Models/user.model.js")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

userRouter.post("/register",async(req,res)=>{
    const {username,email,pass} = req.body;
    try{
        bcrypt.hash(pass,6,async(err,hash)=>{
            if(err){
                res.status(200).send({"error":err})
            }else{
                const user = new UserModel({
                    username,
                    email,
                    pass:hash,
                })
                await user.save();
                res.status(200).send({"msg":"A new user has been registered"})
            }
        })
    }catch(error){
        res.status(400).send({"error":error})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass} = req.body;
    try{
        const user = await UserModel.findOne({email});
        bcrypt.compare(pass, user.pass,(err,result)=>{
            if(result){
                const token = jwt.sign({userID:user._id,username:user.username},"masai");
                res.status(200).send({"msg":"Login Successful","token":token})
            }else{
                res.status(200).send({"error":"wrong Credentials"})
            }
        })
    }catch(error){
        res.status(400).send({"Error":"wrong Credentials"})
    }
})

module.exports={userRouter}



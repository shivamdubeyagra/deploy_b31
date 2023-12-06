const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    pass:String,
},{versionKey:false});

const UserModel = mongoose.model("user",userSchema);

module.exports={UserModel};
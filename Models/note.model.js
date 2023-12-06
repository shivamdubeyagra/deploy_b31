const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title:String,
    body:String,
    userID:String,
    username:String,
},{versionKey:false});

const NoteModel = mongoose.model("Note",noteSchema);

module.exports={NoteModel}; 
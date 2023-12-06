const express = require("express")
const {NoteModel} = require("../Models/note.model.js")
const jwt = require("jsonwebtoken");
const noteRouter = express.Router();
const {auth} = require("../middleware/auth.middleware.js")
noteRouter.post("/create",auth,async(req,res)=>{
    try{
        const note = new NoteModel(req.body);
        await note.save();
        res.status(200).send({"msg":"A new note has been added"});
    }catch(error){
        res.status(400).send({"error":error})
    }
})

noteRouter.get("/",auth,async(req,res)=>{
    try{
        const notes = await NoteModel.find({userID:req.body.userID});
        res.status(200).send(notes)
    }catch(error){
        res.status(400).send({"Error":error})
    }
})

noteRouter.patch("/update/:noteID",auth,async(req,res)=>{
    const {noteID} = req.params
    try{
        const note = await NoteModel.findOne({_id:noteID});
        if(req.body.userID===note.userID){
            await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
            res.status(200).send({"msg":`Note with with ID:${noteID} has been updated`})
        }else{
            res.status(200).send({"msg":"You are not authorized"})
        }
    }catch(error){
        res.status(400).send({"Error":error})
    }
})
noteRouter.delete("/update/:noteID",auth,async(req,res)=>{
    const {noteID} = req.params
    try{
        const note = await NoteModel.findOne({_id:noteID});
        if(req.body.userID===note.userID){
            await NoteModel.findByIdAndDelete({_id:noteID})
            res.status(200).send({"msg":`Note with with ID:${noteID} has been delete`})
        }else{
            res.status(200).send({"msg":"You are not authorized"})
        }
    }catch(error){
        res.status(400).send({"Error":error})
    }
})

module.exports={noteRouter}
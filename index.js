const express = require("express");
const {Connection} = require("./db.js");
const {userRouter} = require("./Routes/user.routes.js");
const {noteRouter} = require("./Routes/note.routes.js");
const app = express();
app.use(express.json());
app.use("/users",userRouter);
app.use("/notes",noteRouter);



app.listen("8080",async()=>{
    try{
        await Connection;
        console.log("Connected to the MOngoDB");
    }catch(error){
        console.log(error);
    }
    console.log("server is running at the port 8080");
})
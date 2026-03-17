import express from "express";
import dbConnect from "./dbConfig/db.js";
import router from "./router/router.js";
import cors from "cors";
const app=express();

app.use(cors());

dbConnect()
const Port = 3000;
app.use(express.json())

app.use("/api",router)

app.listen(Port,()=>{
    console.log(`Server is running on ${Port}`);
    
})
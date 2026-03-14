import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

export const UserModel=mongoose.model("users",UserSchema)


const todoSchema=new mongoose.Schema({
    name:String,
    status:String
})

export const todoModel=mongoose.model("todos",todoSchema)
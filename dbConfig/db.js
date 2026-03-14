import mongoose from "mongoose";

const dbConnect=async()=>{
    const dbConn=await mongoose.connect("mongodb://localhost:27017/TodoList");
    if(dbConn){
        console.log("DataBase is Connect Successfully");
        
    }

}

export default dbConnect;
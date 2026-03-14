import { UserModel } from "../module/module.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken" 

export const userController = (req, res) => {};

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isExist = await UserModel.findOne({ email });
    if (isExist) {
      res.json({
        success: false,
        code: 400,
        message: "User Already Exists!",
        data: isExist,
        error: true,
      });
    } else {
      const { name, email, password } = req.body;
      const hashPassword=await bcrypt.hash(password,10)
      const data = new UserModel({ name, email, password:hashPassword});
      const result = await data.save();
      res.json({
        success: true,
        code: 200,
        message: "User Register Successfully!",
        data: result,
        error: false,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      code: 500,
      message: "Internal server Error!",
      error: true,
    });
    console.log(error)
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data= await UserModel.findOne({email})
    if(data){
      const isExist=await bcrypt.compare(password,data.password)
      if(isExist){
        const payload={email:data.email}
        const token=jwt.sign(payload,"jwt_secret",{expiresIn:"1h"})
        console.log(token)
           res.json({
          success: true,
          code: 200,
          message: "login Successfully! ",
          data: data,
          token:token,
          error: false,
        });
      }else{
         res.json({
          success: false,
          code: 400,
          message: "Invalid Credential login failed  password not match! ",
          data: "",
          error: true,
        });
      }
    }
    else{
       res.json({
        success: false,
        code: 404,
        message: "User Not Found ",
        data: "",
        error: true,
      });
    }
  } catch (err) {
     res.json({
      success: false,
      code: 500,
      message: "Internal server Error!",
      error: true,
    });
    console.log(err)

  }
};

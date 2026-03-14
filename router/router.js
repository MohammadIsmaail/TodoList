import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import {
  registerController,
  userController,
  loginController,
  createTodoController,
  getTodoController,
  deleteTodoController,
  updateTodoController
} from "../controller/controller.js";

router.get("/user", userController);

router.post("/register", registerController);

router.post("/login", loginController);

const AuthMiddleware = (req, res, next) => {
     if(!req.headers.authorization){
    res.json({
          success: false,
          code: 404,
          message: "Token is Required! ",
          data: "",
          error: true,
        });
  }
  const data = req.headers.authorization.split(" ");
  const token = data[1];
 
  // // res.send(data)
  // console.log(token[1])
  jwt.verify(token, "jwt_secret", (err, decode) => {
    if (err) {
      return res.json({
        success: false,
        code: 400,
        message: "Invalid or Expire session",
        date: "",
        err: err,
        error: true,
      });
    } else {
    //   console.log(decode, "############");
    req.user=decode;
      next();
    }
  });
};
router.post("/create-todo", AuthMiddleware, createTodoController);

router.get("/get-todo", AuthMiddleware ,getTodoController)

router.delete("/delete-todo/:id", AuthMiddleware, deleteTodoController)

router.put("/update-todo/:id", AuthMiddleware, updateTodoController)

// router.put("/update/:id",UserController)
// router.delete("/delete/:id",UserController)

export default router;

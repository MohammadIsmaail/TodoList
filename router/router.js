import express from "express"
const router=express.Router();
import { registerController ,userController,loginController} from "../controller/controller.js";

router.get("/user",userController)

router.post("/register",registerController)

router.post("/login",loginController)

// router.put("/update/:id",UserController)

// router.delete("/delete/:id",UserController)

export default router;
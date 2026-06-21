import { Router } from "express";
import { createUser, getMe, loginUser } from "./auth.controller";
import { validate } from "../../middlewares/validate.middleware";
import { loginSchema } from "./auth.schema";
import { registerSchema } from "./auth.schema";



const router = Router()

router.post("/register",validate(registerSchema),createUser)
router.post("/login",validate(loginSchema),loginUser)
router.get("/me",getMe)


export default router
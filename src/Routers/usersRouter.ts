import { Router } from "express";
import { validateBody } from "../Middlewares/validationMiddleware";
import { signUpSchema } from "../Schemas/signUpSchema";
import { insertIntoDb } from "../Controllers/userController";
import { verifyUser } from "../Controllers/userController";

const userRouter = Router();

userRouter.post("/signup", validateBody(signUpSchema), insertIntoDb)
userRouter.post("/signin", validateBody(signUpSchema), verifyUser)

export default userRouter; 

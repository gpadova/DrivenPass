import { Router } from "express";
import { validateBody } from "../Middlewares/validationMiddleware.js";
import { signUpSchema } from "../Schemas/signUpSchema.js";
import { insertIntoDb } from "../Controllers/userController.js";
import { verifyUser } from "../Controllers/userController.js";

const userRouter = Router();

userRouter.post("/singup", validateBody(signUpSchema), insertIntoDb)
userRouter.post("/signin", validateBody(signUpSchema), verifyUser)

export default userRouter;

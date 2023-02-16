import { SignUp } from "@/protocols";
import Joi from "joi";

export const signUpSchema = Joi.object<SignUp>({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required()
})
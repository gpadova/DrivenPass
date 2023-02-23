import Joi from "joi";
import { Credential } from "@/protocols";

export const credentialSchema = Joi.object<Credential>({
    title: Joi.string().required(),
    url: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
})
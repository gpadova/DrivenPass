import Joi from "joi";
import { Credential } from "@/protocols";

export const credentialSchema = Joi.object<Credential>({
    title: Joi.string().required(),
    url: Joi.string().uri().regex(/^(http(s):\/\/.)[-a-zA-Z0-9@:%.~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%.~#?&//=]*)$/).required(),
    username: Joi.string().required(),
    password: Joi.string().required()
})
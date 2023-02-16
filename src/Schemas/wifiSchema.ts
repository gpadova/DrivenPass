import { Wifi } from "@/protocols";
import Joi from "joi";

export const WifiSchema = Joi.object<Wifi>({
    title: Joi.string().required(),
    network: Joi.string().required(),
    password: Joi.string().required()
})
import { SignUp } from "../protocols.js";
import userResository from "../Repositories/userRepository.js";
import usersService from "../Services/userService.js";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function insertIntoDb(req: Request, res: Response) {
    const user = req.body as SignUp;
    try {
        await usersService.signUpService(user)
        return res.sendStatus(httpStatus.CREATED)
    } catch (error) {
        console.log(error)
        return res.sendStatus(httpStatus.CONFLICT)
    }
}

export async function verifyUser(req: Request, res: Response) {
    const user = req.body as SignUp;
    try {
        const token = await usersService.signInService(user)
        return res.status(httpStatus.OK).send({token})
    } catch (error) {
        console.log(error)
        return res.sendStatus(httpStatus.UNAUTHORIZED)
    }
}
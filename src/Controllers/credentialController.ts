import { Response } from "express";
import { AuthenticatedRequest } from "../Middlewares/authenticationMiddleware.js";
import httpStatus from "http-status";
import { Credential } from "../protocols.js";
import credentialService from "../Services/credentialsService.js";
import Cryptr from "cryptr";

export async function inserCredentialDb(req: AuthenticatedRequest, res: Response) {
    const { userId } = req
    const credential = req.body as Credential;
    try {
        await credentialService.insertCredential(credential, userId)
        return res.sendStatus(httpStatus.CREATED)
    } catch (error) {
        console.log(error)
        return res.sendStatus(httpStatus.FORBIDDEN)
    }
}

export async function getSpecificCredential(req: AuthenticatedRequest, res: Response) {
    const id = req.params.id;
    const { userId } = req
    const cryptr = new Cryptr('myTotallySecretKey')
    try {
        const credential = await credentialService.getSpecificCredentialService(id, userId)
        const decryptedString = cryptr.decrypt(credential.password);
        return res.status(httpStatus.OK).send({...credential, password: decryptedString})
    } catch (error) {
        console.log(error)
        return res.sendStatus(httpStatus.FORBIDDEN);
    }
}

export async function getCredentials(req: AuthenticatedRequest, res: Response) {
    const { userId } = req
    const cryptr = new Cryptr('myTotallySecretKey')
    try {
        const credential = await credentialService.getCredentials(userId)
        const obj = []

        for(let i = 0; i < credential.length; i++){
            let decryptedString = cryptr.decrypt(credential[i].password);
            obj.push({
                    id: credential[i].id,
                    title: credential[i].title,
                    url: credential[i].url,
                    username: credential[i].username,
                    userId: credential[i].userId,
                    password: decryptedString})
        }
        return res.status(httpStatus.OK).send(obj)
    } catch (error) {
        console.log(error)
        res.sendStatus(httpStatus.CONFLICT)
    }
}

export async function deleteCredential(req: AuthenticatedRequest, res: Response) {
    const { userId } = req
    const { id } = req.params;
    try {
        await credentialService.deleteCredential(userId, id);
        return res.sendStatus(httpStatus.ACCEPTED);
    } catch (error) {
        console.log(error)
        return res.sendStatus(httpStatus.FORBIDDEN)
    }
}
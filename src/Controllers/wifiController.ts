import { Response } from "express";
import { AuthenticatedRequest } from "../Middlewares/authenticationMiddleware";
import httpStatus from "http-status";
import { Wifi } from "../protocols";
import wifiService from "../Services/wifiService";
import { cryptr } from "../server";

export async function inserWifiDb(req: AuthenticatedRequest, res: Response) {
    const { userId } = req
    const wifi = req.body as Wifi;
    try {
        await wifiService.insertWifi(wifi, userId)
        return res.sendStatus(httpStatus.CREATED)
    } catch (error) {
        return res.sendStatus(httpStatus.FORBIDDEN)
    }
}

export async function getSpecificWifi(req: AuthenticatedRequest, res: Response) {
    const id = req.params.id;
    const { userId } = req;
    
    try {
        const wifi = await wifiService.getSpecificWifi(userId, id)
        const decryptedString = cryptr.decrypt(wifi.password);
        return res.status(httpStatus.OK).send({...wifi, password: decryptedString})
    } catch (error) {
        return res.sendStatus(httpStatus.UNAUTHORIZED)
    }
}

export async function getWifi(req: AuthenticatedRequest, res: Response) {
    const { userId } = req   

    try {
        const wifi = await wifiService.getWifi(userId)
        const obj = []

        for(let i = 0; i < wifi.length; i++){
            let decryptedString = cryptr.decrypt(wifi[i].password);
            obj.push({
                    id: wifi[i].id,
                    title: wifi[i].title,
                    network: wifi[i].network,
                    userId: wifi[i].userId,
                    password: decryptedString})
        }
        return res.status(httpStatus.OK).send(obj)
    } catch (error) {
        return res.sendStatus(httpStatus.UNAUTHORIZED)
    }
}

export async function deleteWifi(req: AuthenticatedRequest, res: Response) {
    const { userId } = req
    const { id } = req.params;
    try {
        await wifiService.deleteWifiService(userId, id);
        return res.sendStatus(httpStatus.ACCEPTED);
    } catch (error) {
        return res.sendStatus(httpStatus.FORBIDDEN)
    }
}
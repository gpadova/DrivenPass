import { Wifi } from "../protocols.js";
import Cryptr from "cryptr";
import wifiRepository from "../Repositories/wifiRepository.js";
import { invalidGetWifi } from "../errors/invalidGetWifi.js";


async function insertWifi(wifi:Wifi, userId: number) {
     return wifiRepository.insertWifiQuery(wifi, userId)
}

async function getSpecificWifi(userId: number, id: string) {
    const wifi = await wifiRepository.getSpecificWifiQuery(userId, id);
    if(!wifi) throw invalidGetWifi();

    return wifi
}

async function getWifi(userId: number) {
    const wifi = await wifiRepository.getWifiQuery(userId)
    if(!wifi) throw invalidGetWifi();

    return wifi
}

async function deleteWifiService(userId:number, id: string) {
    const deletedWifi = await wifiRepository.deletedWifiQuery(userId, id)

    if(!deletedWifi) throw invalidGetWifi();

    return deletedWifi
}

const wifiService = {
    insertWifi,
    getSpecificWifi,
    getWifi,
    deleteWifiService
}

export default wifiService;
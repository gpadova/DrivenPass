import { Wifi } from "../protocols";
import wifiRepository from "../Repositories/wifiRepository";
import { invalidGetWifi } from "../errors/invalidGetWifi";


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
    if(wifi.length === 0) throw invalidGetWifi();

    return wifi
}

async function deleteWifiService(userId:number, id: string) {
    const deletedWifi = await wifiRepository.deletedWifiQuery(userId, id)

    if(deletedWifi.count === 0) throw invalidGetWifi();
    return deletedWifi
}

const wifiService = {
    insertWifi,
    getSpecificWifi,
    getWifi,
    deleteWifiService
}

export default wifiService;
import { prisma } from "../Config/database";
import { Wifi } from "../protocols";
import { cryptr } from "@/server";

async function insertWifiQuery(wifi: Wifi, userId: number) {

    const encryptedString = cryptr.encrypt(wifi.password);

    return prisma.network.create({
        data: {
            network: wifi.network,
            password: encryptedString,
            title: wifi.title,
            userId
        }
    })
}

async function getSpecificWifiQuery(userId: number, id: string) {
    return prisma.network.findFirst({
        where: {
            id: Number(id),
            userId
        }
    })    
}

async function getWifiQuery( userId: number) {
    return prisma.network.findMany({
        where: {
            userId
        }
    })
}

async function deletedWifiQuery(userId: number,id: string) {
    return prisma.network.deleteMany({
        where: {
            userId,
            id: Number(id)
        }
    })
}

const wifiRepository = {
    insertWifiQuery,
    getSpecificWifiQuery,
    getWifiQuery,
    deletedWifiQuery
}

export default wifiRepository;

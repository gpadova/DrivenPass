import { prisma } from "@/Config/database";
import { cryptr } from "@/server";
import { faker } from "@faker-js/faker";

export async function generateWifi(userId: number) {
    const password = cryptr.encrypt(faker.internet.password())
    return prisma.network.create({
        data: {
            network: faker.internet.ipv4(),
            password,
            title: faker.internet.userName(),
            userId,
        }
    })
}
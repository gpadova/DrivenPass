import { prisma } from "@/Config/database";
import { cryptr } from "@/server";
import { faker } from "@faker-js/faker";

export async function generateValidCredential(userId:number) {
    const password = cryptr.encrypt(faker.internet.url())
    return prisma.credential.create({
        data: {
            title:faker.name.firstName(),
            url: faker.internet.url(),
            username: faker.internet.userName(),
            password,
            userId
        }
    })
}
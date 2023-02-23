import { prisma } from "../Config/database";
import { faker } from "@faker-js/faker";

export async function generateValidCredential(userId:number) {
    return prisma.credential.create({
        data: {
            title:faker.name.firstName(),
            url: faker.internet.url(),
            username: faker.internet.userName(),
            password: faker.internet.url(),
            userId

        }
    })
}
import { prisma } from "../src/Config/database";
import * as jwt from "jsonwebtoken";
import { SignUp } from "./protocols";


export async function cleanDb() {
    await prisma.credential.deleteMany({});
    await prisma.network.deleteMany({});
    await prisma.user.deleteMany({});
}

export async function generateValidToken(user: SignUp) {

    const token = await jwt.sign({ userId: Number(user.id) }, process.env.JWT_SECRET);
    return token;
}
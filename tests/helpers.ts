import { prisma } from "@/Config/database";
import * as jwt from "jsonwebtoken";
import { generateUser } from "./factories/usersFactories";
import { SignUp } from "@/protocols";


export async function cleanDb() {
    await prisma.credential.deleteMany({});
    await prisma.network.deleteMany({});
    await prisma.user.deleteMany({});
}

export async function generateValidToken(user?: SignUp) {
    const incomingUser = user || (await generateUser());
    const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);
  
    return token;
}
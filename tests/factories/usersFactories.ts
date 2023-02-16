import { prisma } from "@/Config/database";
import { SignUp } from "@/protocols";
import {faker} from "@faker-js/faker";
import bcrypt from "bcrypt"


export async function generateUser(params: Partial<SignUp> = {}) {
    const incomingPassword = params.password || faker.internet.password(6);
    const hashedPassword = await bcrypt.hash(incomingPassword, 10);
  
    return prisma.user.create({
      data: {
        email: params.email || faker.internet.email(),
        password: hashedPassword,
      },
    });
}
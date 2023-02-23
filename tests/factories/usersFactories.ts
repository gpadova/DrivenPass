import { prisma } from "@/Config/database";
import { SignUp } from "@/protocols";
import bcrypt from "bcrypt"

export async function generateUser(body: SignUp) {
    const hashedPassword = bcrypt.hashSync(body.password, 10)
    return await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword
      },
    });
}
import { prisma } from "@/Config/database";
import { SignUp } from "@/protocols";
import bcrypt from "bcrypt"

async function verifyEmail(user:SignUp) {
    return await prisma.user.findFirst({
        where: {
            email: user.email
        }
    })
}

async function insertUserDb(user: SignUp) {
    const hashedPassword = bcrypt.hashSync(user.password, 10)
    return prisma.user.create({
        data: {
            email: user.email,
            password: hashedPassword
        }
    })
}

async function verifyIfPasswordIsRight(user: SignUp) {
    const userExists
}

const userResository = {
    verifyEmail, 
    insertUserDb,
    verifyIfUserExists
};

export default userResository;
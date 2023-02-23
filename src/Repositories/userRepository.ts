import { prisma } from "../Config/database";
import { SignUp } from "../protocols";
import bcrypt from "bcrypt"

async function verifyEmail(users:SignUp) {
    return prisma.user.findFirst({
        where: {
            email: users.email
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


const userResository = {
    verifyEmail, 
    insertUserDb
};

export default userResository;
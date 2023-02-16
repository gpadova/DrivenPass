import { prisma } from "../Config/database.js";
import { SignUp } from "../protocols.js";
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


const userResository = {
    verifyEmail, 
    insertUserDb
};

export default userResository;
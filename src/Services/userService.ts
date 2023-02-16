import { invalidDataError } from "../errors/invalidDataError.js";
import { invalidEmailError } from "../errors/invalidEmail.js";
import { SignUp } from "../protocols.js";
import userResository from "../Repositories/userRepository.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

async function signUpService(user: SignUp) {
    const existingEmail = await userResository.verifyEmail(user)
    if(existingEmail) throw invalidEmailError;

    await userResository.insertUserDb(user)
}

async function signInService(user: SignUp) {
    const existinguser = await userResository.verifyEmail(user)
    if(!existinguser) throw invalidEmailError;

    if(!bcrypt.compareSync(user.password, existinguser.password)){
        throw invalidDataError
    }
    const userId = existinguser.id

    const token = jwt.sign( { userId } , process.env.JWT_SECRET);
    return token
}

const usersService = {
    signUpService,
    signInService
}

export default usersService;
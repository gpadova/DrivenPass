import { invalidDataError } from "../errors/invalidDataError";
import { invalidEmailError } from "../errors/invalidEmail";
import { SignUp } from "../protocols";
import userResository from "../Repositories/userRepository";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

async function signUpService(users: SignUp) {
    const existingEmail = await userResository.verifyEmail(users)
    if(existingEmail) throw invalidEmailError;

    await userResository.insertUserDb(users)
    return existingEmail
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
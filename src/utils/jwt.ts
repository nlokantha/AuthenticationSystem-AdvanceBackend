
import jwt from "jsonwebtoken"
import { JWT_ACCESS_SECRET,JWT_REFRESH_SECRET } from "../config/config"
import { ApiError } from "./apiError"
import {randomUUID} from "crypto"


export const generateAccessToken = (userId:string,role:string)=>{
    return jwt.sign({
        sub: userId,
        role
     }, JWT_ACCESS_SECRET!, {expiresIn: "15m"})
}


export const verifyAccessToken = (token:string) => {
    try {
        return jwt.verify(token, JWT_ACCESS_SECRET!)
    } catch (error) {
        throw new ApiError(401, "Invalid token")
    }
}  


export const generateRefreshToken = (userId:string) => {
    const jti = randomUUID()
    const token =  jwt.sign({
        sub: userId,
        jti
     }, JWT_REFRESH_SECRET!, {expiresIn: "30d"})

    return { token, jti }   
}

export const verifyRefreshToken = (token:string) => {
    try {
        return jwt.verify(token, JWT_REFRESH_SECRET!)
    } catch (error) {
        throw new ApiError(401, "Invalid token")
    }
}
    
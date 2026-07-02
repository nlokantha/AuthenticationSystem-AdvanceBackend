import { redis } from "../../lib/redis"
import { ApiError } from "../../utils/apiError"
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt"
import { authRepository } from "./auth.repository"
import bcrypt from "bcrypt"
import logger from "../../lib/logger"


export const authService = {

    async registerUser(name: string, email: string, password: string) {
        const existingUser = await authRepository.findUserByEmail(email)
        if (existingUser) {
            throw new ApiError(400, "User already exists")
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await authRepository.createUser(name, email, hashedPassword)

        // logger.info("user", { id: user.id, email: user.email, name: user.name, role: user.role })

        const accessToken = generateAccessToken(user.id, user.role)
        const { token: refreshToken, jti } = generateRefreshToken(user.id)

        await redis.set(`refreshToken:${jti}`, user.id, "EX", 30 * 24 * 60 * 60) // Store refresh token in Redis with expiration

        logger.info("User registered successfully")
        return { accessToken, refreshToken }
    },


    async loginUser(email:string,password:string){
        const user = await authRepository.findUserByEmail(email)
        if (!user) {
            throw new ApiError(400, "Invalid credentials")
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash)
        if (!isMatch) {
            throw new ApiError(400, "Invalid credentials")
        }

        const accessToken = generateAccessToken(user.id, user.role)
        const { token: refreshToken, jti } = generateRefreshToken(user.id)

        await redis.set(`refreshToken:${jti}`, user.id, "EX", 30 * 24 * 60 * 60) // Store refresh token in Redis with expiration

        logger.info("User logged in successfully")
        return { accessToken, refreshToken }
    },


    async getMe(userId: string) {
        const user = await authRepository.findUserById(userId)
        if (!user) {
            throw new ApiError(404, "User not found")
        }

        return { id: user.id, name: user.name, email: user.email, role: user.role }
    }
}
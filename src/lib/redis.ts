import Redis from "ioredis";
import { REDIS_URL } from "../config/config";



export const redis = new Redis(REDIS_URL!)

redis.on("connect",()=>{
    console.log("Connected to Redis")
})

redis.on("error",(error)=>{
    console.error("Redis error:",error)
})


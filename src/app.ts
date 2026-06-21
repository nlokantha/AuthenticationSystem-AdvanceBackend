import express from 'express';
import type { Response, Request } from "express";
import cors from "cors"
import logger from './lib/logger';
import authRoutes from "./modules/auth/auth.routes"
import cookieParser from "cookie-parser";





export const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser());



app.get("/",(req: Request,res: Response)=>{
    logger.info("Hello World")
    res.send("Hello World")
})


app.use("/api/auth",authRoutes)
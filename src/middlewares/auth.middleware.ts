import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError";


declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(401, "Unauthorized")
        }

        const token = authHeader.split(" ")[1];

        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as { sub: string; role: string };
        
        req.user = {
            id: payload.sub,
            role: payload.role
        }
        next();
    }catch (error) {
        next(new ApiError(401, "Unauthorized"))
    }
}
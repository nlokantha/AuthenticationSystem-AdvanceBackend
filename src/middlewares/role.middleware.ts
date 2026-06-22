import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError";


export const roleMiddleware = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new ApiError(401, "Unauthorized"));
        }

        if (!roles.includes(req.user.role)) {
            return next(new ApiError(403, "Forbidden"));
        }

        if (req.user.role === "admin" && !roles.includes("admin")) {
            return next(new ApiError(403, "Forbidden"));
        }

        if (req.user.role === "user" && !roles.includes("user")) {
            return next(new ApiError(403, "Forbidden"));
        }

        if (req.user.role === "guest" && !roles.includes("guest")) {
            return next(new ApiError(403, "Forbidden"));
        }

        next();
    };
};
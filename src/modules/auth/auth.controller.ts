import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";


export const createUser = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const {name,email,password} = req.body
        // Call the service to create the user
        const result = await authService.registerUser(name,email,password)
        res.status(201).json({
            success:true,
            message:"User registered successfully",
            data:result
        })
    }catch(error){
        next(error)
    }
}

export const loginUser = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const {email,password} = req.body
        // Call the service to login the user
        const result = await authService.loginUser(email,password)
        res.status(200).json({
            success:true,
            message:"User logged in successfully",
            data:result
        })
    }catch(error){
        next(error)
    }
}


export const getMe = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const userId = req.user?.id
        if(!userId){
            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            })
        }
        const result = await authService.getMe(userId)
        res.status(200).json({
            success:true,
            message:"User fetched successfully",
            data:result
        })
    }catch(error){
        next(error)
    }
}
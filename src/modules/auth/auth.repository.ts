import { prisma } from "../../lib/prisma";




export const authRepository = {
    createUser: async (name: string, email: string, password: string) => prisma.user.create({
        data: {
            name,
            email,
            passwordHash: password
        }
    }),

    findUserByEmail:async (email:string) => prisma.user.findUnique({
        where:{
            email
        }
    }),

    findUserById:async (id:string) => prisma.user.findUnique({
        where:{
            id
        }
    })  


}
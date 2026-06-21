import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma";
import { DATABASE_URL } from "../config/config"; 

const connectionString = `${DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
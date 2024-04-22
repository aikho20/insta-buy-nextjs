import { PrismaClient } from '@prisma/client'

declare global {
    var primsma: PrismaClient | undefined
}

export const db = globalThis.primsma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.primsma = db
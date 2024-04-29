import connectDB from "@/lib/db"
import User from "@/lib/model/user.model"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { getServerSession } from "next-auth"
import { nextauthOptions } from "@/lib/next-auth-option"


export async function POST(req: NextRequest) {
    try {
        connectDB()
        const session = await getServerSession(nextauthOptions)
        const { name } = await req.json();
        if (!session) {
            return NextResponse.json({ error: 'UnAuthorized!' }, { status: 400 })
        }

        const user = await User.findByIdAndUpdate(session?.user?._id, {
            name
        }, { new: true }).select("-password")

        if (!user) {
            return NextResponse.json({ error: 'User does not exist!' }, { status: 400 })
        }

        return NextResponse.json({ message: 'successfully updated!' }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}
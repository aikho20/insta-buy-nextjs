import connectDB from "@/lib/db"
import User from "@/lib/model/user.model"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"


export async function POST(req: NextRequest) {
    try {
        connectDB()
        const { name, email, password, role } = await req.json();
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: 'User already exist!' }, { status: 200 })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        })

        // console.log({newUser})
        await newUser.save()

        return NextResponse.json({ message: 'Successfully registed!' }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}
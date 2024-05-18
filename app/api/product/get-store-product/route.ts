import connectDB from "@/lib/db"
import User from "@/lib/model/user.model"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"
import Product from "@/lib/model/product.model"
import { getServerSession } from "next-auth"
import { nextauthOptions } from "@/lib/next-auth-option"




export async function POST(req: NextRequest) {

    try {
        connectDB()
        const { merchantId } = await req.json();
        const product = await Product.find({ merchant: merchantId }).select("-merchant")
        if (!product) {
            return NextResponse.json({ message: 'No product found' }, { status: 200 })
        }

        return NextResponse.json({ product: product }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}
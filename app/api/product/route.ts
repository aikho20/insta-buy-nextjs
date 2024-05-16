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
        const session = await getServerSession(nextauthOptions)
        const { productName, description, price, discount, quantity, images } = await req.json();
        const user = await User.findOne({ email: session?.user.email });
        if (!session) {
            return NextResponse.json({ error: 'UnAuthorized!' }, { status: 200 })
        }
        if (session?.user?.role !== "admin") {
            return NextResponse.json({ error: 'No permission to add a product!' }, { status: 200 })
        }

        const newProduct = new Product({
            images,
            productName,
            description,
            price,
            discount,
            merchant: session?.user?._id,
            quantity,
        })

        // console.log({newUser})
        await newProduct.save()

        // Suggested code may be subject to a license. Learn more: ~LicenseLog:1492981750.
        return NextResponse.json({ message: 'Successfully added!' }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}

export async function GET() {

    try {
        connectDB()

        //const { id } = await req.json();
        const product = await Product.find({}).select("-merchant")
        if (!product) {
            return NextResponse.json({ message: 'No product found' }, { status: 200 })
        }

        return NextResponse.json({ product: product }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}
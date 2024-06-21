import connectDB from '@/lib/db'
import User from '@/lib/model/user.model'
import { NextRequest, NextResponse } from 'next/server'
import Product from '@/lib/model/product.model'
import { getServerSession } from 'next-auth'
import { nextauthOptions } from '@/lib/next-auth-option'

export async function POST(req: NextRequest) {
  try {
    await connectDB() // Ensure to await the connection
    const session = await getServerSession(nextauthOptions)
    const { productName, description, price, discount, category, quantity, images, _id } =
      await req.json()

    if (!session) {
      return NextResponse.json({ error: 'UnAuthorized!' }, { status: 403 }) // Use 401 for unauthorized access
    }

    const user = await User.findById(session.user._id)
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'UnAuthorized!' }, { status: 403 }) // Use 403 for forbidden access
    }

    const product = await Product.findById(_id)
    if (!product) {
      return NextResponse.json({ error: 'Product not found!' }, { status: 400 }) // Use 404 for not found
    }

    if (product.merchant.toString() === user._id.toString()) {
      await Product.findByIdAndUpdate(_id, {
        category,
        images,
        productName,
        description,
        price,
        discount,
        quantity,
      })
      return NextResponse.json({ message: 'Successfully updated!' }, { status: 200 })
    } else {
      return NextResponse.json({ message: 'Dont have permission!' }, { status: 400 })
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

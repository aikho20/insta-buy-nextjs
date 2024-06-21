import connectDB from '@/lib/db'
import User from '@/lib/model/user.model'
import { NextRequest, NextResponse } from 'next/server'
import Product from '@/lib/model/product.model'
import { getServerSession } from 'next-auth'
import { nextauthOptions } from '@/lib/next-auth-option'

export async function POST(req: NextRequest) {
  try {
    connectDB()
    const session = await getServerSession(nextauthOptions)
    const { productName, description, price, discount, quantity, images, category } =
      await req.json()
    const user = await User.findById(session?.user._id)

    if (!session || !user || user.role !== 'admin') {
      return NextResponse.json({ error: 'UnAuthorized!' }, { status: 403 })
    }

    const newProduct = new Product({
      images,
      category,
      productName,
      description,
      price,
      discount,
      merchant: user?._id,
      quantity,
    })

    await newProduct.save()
    return NextResponse.json({ message: 'Successfully added!' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

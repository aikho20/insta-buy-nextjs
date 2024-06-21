import connectDB from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import Product from '@/lib/model/product.model'

export async function POST(req: NextRequest) {
  try {
    connectDB()
    const { merchantId } = await req.json()
    const product = await Product.find({ merchant: merchantId }).select('-merchant')

    if (!product) {
      return NextResponse.json({ message: 'No product found' }, { status: 200 })
    }
    const updatedProduct = product.map((items) => {
      return {
        _id: items._id,
        images: items.images,
        category: items.category,
        productName: items.productName,
        description: items.description,
        discount: items.discount,
        quantity: items.quantity,
        price: Number(items.price.toString()),
      }
    })
    return NextResponse.json({ product: updatedProduct }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

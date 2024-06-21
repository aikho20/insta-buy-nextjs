import connectDB from '@/lib/db'
import User from '@/lib/model/user.model'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { nextauthOptions } from '@/lib/next-auth-option'
import Cart from '@/lib/model/cart.model'
import Product from '@/lib/model/product.model'

export async function POST(req: NextRequest) {
  try {
    connectDB()
    const { merchantId } = await req.json()
    const session = await getServerSession(nextauthOptions)
    const user = await User.findById(session?.user._id)
    const cart = (await Cart.findOne({ user: user._id, merchant: merchantId })) || []

    if (!session || !user || !merchantId) {
      return NextResponse.json({ error: 'Unauthorized!' }, { status: 200 })
    }

    if (cart.product.length > 0) {
      const cartItems = await Promise.all(
        cart.product.map(async (item: any) => {
          const searchprod = await Product.findOne({ _id: item.id }).select('-merchant')
          if (!searchprod) {
            throw new Error(`Product with id ${item.id} not found`)
          }
          return {
            _id: searchprod._id,
            title: searchprod.productName,
            image: searchprod.images[0],
            price: Number(searchprod.price.toString()),
            value: item.value,
          }
        })
      )
      return NextResponse.json({ cart: cartItems }, { status: 200 })
    } else {
      return NextResponse.json({ cart: [] }, { status: 200 })
    }

    // Suggested code may be subject to a license. Learn more: ~LicenseLog:1492981750.
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

import connectDB from '@/lib/db'
import User from '@/lib/model/user.model'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { nextauthOptions } from '@/lib/next-auth-option'
import Cart from '@/lib/model/cart.model'

export async function POST(req: NextRequest) {
  try {
    connectDB()
    const { product, merchant } = await req.json()
    const session = await getServerSession(nextauthOptions)
    const user = await User.findById(session?.user._id)
    const cart = await Cart.findOne({ user: user._id, merchant: merchant })
    if (!session && !user) {
      return NextResponse.json({ error: 'unauthorized to add product in cart!' }, { status: 200 })
    }

    const newCart = new Cart({
      product: product,
      user: user._id,
      merchant: merchant,
    })
    if (cart) {
      await Cart.findByIdAndUpdate(cart._id, { product: product })
      return NextResponse.json({ message: 'Successfully updated!' }, { status: 200 })
    } else {
      await newCart.save()
      return NextResponse.json({ message: 'Successfully added!' }, { status: 200 })
    }
    // Suggested code may be subject to a license. Learn more: ~LicenseLog:1492981750.
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

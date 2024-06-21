import connectDB from '@/lib/db'
import User from '@/lib/model/user.model'
import { NextRequest, NextResponse } from 'next/server'
export async function GET() {
  try {
    connectDB()
    //const { id } = await req.json();
    const store = await User.find({ role: 'admin' })
      .select('-password')
      .select('-role')
      .select('-email')
      .select('-provider')
    if (!store) {
      return NextResponse.json({ message: 'No store found' }, { status: 200 })
    }

    return NextResponse.json({ store: store }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
export async function POST(req: NextRequest) {
  try {
    connectDB()
    const { merchantId } = await req.json()
    const store = await User.findOne({ _id: merchantId })
      .select('-password')
      .select('-role')
      .select('-email')
      .select('-provider')
    if (!store) {
      return NextResponse.json({ message: 'No store found' }, { status: 200 })
    }
    return NextResponse.json({ store: store }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

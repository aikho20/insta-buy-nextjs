import { Double, Int32 } from 'mongodb'
import mongoose from 'mongoose'

const productItemSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  value: { type: Number, required: true },
})

const cartSchema = new mongoose.Schema(
  {
    product: {
      type: [productItemSchema],
      required: true,
    },
    merchant: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema)

export default Cart

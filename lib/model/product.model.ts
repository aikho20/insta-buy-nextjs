import { Double, Int32 } from "mongodb"
import mongoose from "mongoose"



const productSchema = new mongoose.Schema({
    images: {
        type: Array,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    merchant: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Product = mongoose.models.Product || mongoose.model("Product", productSchema)

export default Product
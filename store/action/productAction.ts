import { apiSlice } from '@/lib/config/apiSlice'

// API endpoint for fetching data
interface productProps {
  _id?: string
  images: string[]
  category: string
  productName: string
  description: string
  price: number
  discount: number
  quantity: number
}

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // <Type of data the call will return, Type of parameter being passed to the query function>
    addProduct: builder.mutation({
      query: ({
        _id,
        productName,
        description,
        price,
        discount,
        quantity,
        images,
        category,
      }: productProps) => ({
        url: '/api/product/add-product',
        method: 'POST',
        body: { productName, description, price, discount, quantity, images, category },
      }),
    }),
    updateProduct: builder.mutation({
      query: ({
        productName,
        description,
        price,
        discount,
        quantity,
        images,
        category,
        _id,
      }: productProps) => ({
        url: '/api/product/update-product',
        method: 'POST',
        body: { productName, description, price, discount, quantity, images, category, _id },
      }),
    }),
  }),
})

export const { useAddProductMutation, useUpdateProductMutation } = productApi

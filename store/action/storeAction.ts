import { apiSlice } from '@/lib/config/apiSlice'

// API endpoint for fetching data

interface ProductProps {
  _id: string
  title: string
  price: number
  image: string
  value: number
}
interface ProductQuery {
  merchantId: string
}

interface CartProps {
  merchant: string
  product: Array<ProductProps>
}

export const storeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // <Type of data the call will return, Type of parameter being passed to the query function>
    getAllStore: builder.query({
      query: ({}) => ({
        url: `/api/store`,
        method: 'GET',
      }),
    }),
    getStore: builder.mutation({
      query: ({ merchantId }: { merchantId: string }) => ({
        url: `/api/store`,
        method: 'POST',
        body: { merchantId },
      }),
    }),
    addToCart: builder.mutation({
      query: ({ merchant, product }: CartProps) => ({
        url: `/api/store/add-to-cart`,
        method: 'POST',
        body: {
          merchant,
          product,
        },
      }),
    }),
    getStoreProduct: builder.mutation({
      query: ({ merchantId }: ProductQuery) => ({
        url: `/api/store/get-store-product`,
        method: 'POST',
        body: { merchantId },
      }),
    }),
    getStoreCart: builder.mutation({
      query: ({ merchantId }: { merchantId: string }) => ({
        url: `/api/store/get-cart`,
        method: 'POST',
        body: {
          merchantId,
        },
      }),
    }),
  }),
})

export const {
  useGetAllStoreQuery,
  useGetStoreMutation,
  useAddToCartMutation,
  useGetStoreCartMutation,
  useGetStoreProductMutation,
} = storeApi

import { apiSlice } from "@/lib/config/apiSlice";


// API endpoint for fetching data
interface productProps {
    images: string[],
    productName: string,
    description: string,
    price: number,
    discount: number,
    quantity: number,
}
interface productQuery {
    merchantId: string
}



export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({     // <Type of data the call will return, Type of parameter being passed to the query function>
        addProduct: builder.mutation({
            query: ({ productName, description, price, discount, quantity, images }: productProps) => ({
                url: '/api/product/add-product',
                method: 'POST',
                body: { productName, description, price, discount, quantity, images },
            }),
        }),
        getProduct: builder.mutation({
            query: ({ merchantId }: productQuery) => ({
                url: `/api/product/get-store-product`,
                method: 'POST',
                body: { merchantId }
            }),
        }),

    }),
});

export const { useAddProductMutation, useGetProductMutation } = productApi;
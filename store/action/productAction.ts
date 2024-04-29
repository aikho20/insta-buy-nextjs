import { apiSlice } from "@/lib/config/apiSlice";


// API endpoint for fetching data
interface productProps {
    productName: string,
    description: string,
    price: number,
    discount: number,
    quantity: number,
}



export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({     // <Type of data the call will return, Type of parameter being passed to the query function>
        addProduct: builder.mutation({
            query: ({ productName, description, price, discount, quantity }: productProps) => ({
                url: '/api/product',
                method: 'POST',
                body: { productName, description, price, discount, quantity },
            }),
        }),

    }),
});

export const { useAddProductMutation } = productApi;
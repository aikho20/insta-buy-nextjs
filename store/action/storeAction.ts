import { apiSlice } from "@/lib/config/apiSlice";


// API endpoint for fetching data

interface storeQuery {
    id: string
}



export const storeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({     // <Type of data the call will return, Type of parameter being passed to the query function>
        getAllStore: builder.query({
            query: ({ }) => ({
                url: `/api/store`,
                method: 'GET'
            }),
        }),
        getStore: builder.mutation({
            query: ({ merchantId }) => ({
                url: `/api/store`,
                method: 'POST',
                body: { merchantId }
            }),
        }),

    }),
});

export const { useGetAllStoreQuery, useGetStoreMutation } = storeApi;
import { apiSlice } from "@/lib/config/apiSlice";

// API endpoint for fetching data
interface profileProps {
    name: string
}
interface passwordProps {
    oldPassword: string, newPassword: string
}



export const accountApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({     // <Type of data the call will return, Type of parameter being passed to the query function>
        updateProfile: builder.mutation({
            query: ({ name }: profileProps) => ({
                url: '/api/account/profile-update',
                method: 'POST',
                body: { name },
            }),
        }),
        updatePassword: builder.mutation({
            query: ({ oldPassword, newPassword }: passwordProps) => ({
                url: '/api/account/password-update',
                method: 'POST',
                body: { oldPassword, newPassword },
            }),
        }),
    }),
});

export const { useUpdatePasswordMutation, useUpdateProfileMutation } = accountApi;
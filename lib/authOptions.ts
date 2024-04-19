import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'


export const authOptions: AuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ]
}
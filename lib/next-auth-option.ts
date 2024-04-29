import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import connectDB from "./db"
import bcrypt from 'bcrypt'
import User from "./model/user.model"

export const nextauthOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/login", // app/signin
        error: "/auth/login", // app/error
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials) {
                connectDB()
                if (!credentials?.email || !credentials?.password) {
                    return null
                }
                const user = await User.findOne({ email: credentials.email })

                if (!user) {
                    throw new Error('Invalid email or password')
                }

                const passwordIsValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                )

                if (!passwordIsValid) {
                    throw new Error('Invalid email or password')
                }

                return { ...user._doc, _id: user._id.toString() }

            }
        })
    ],
    callbacks: {
        async signIn({ account, profile }) {
            // console.log({account, profile})
            if (account?.type === "oauth" && profile) {
                connectDB()
                const user = await User.findOne({ email: profile.email })

                if (user) return true

                const newUser = new User({
                    name: profile.name,
                    email: profile.email,
                    image: profile.image,
                    provider: account.provider
                })

                // console.log(newUser)
                await newUser.save()

                return true
            }
            return true
        },
        async jwt({ token, trigger, session }) {
            // console.log({token})
            // console.log({trigger, session})
            if (trigger === "update") {
                token.name = session.name
            } else {
                if (token.email) {
                    connectDB()
                    const user = await User.findOne({ email: token.email }).select("-password")
                    if (user) {
                        token.name = user.name
                        token._id = user._id
                        token.role = user.role
                        token.provider = user.provider
                    }
                }
            }
            return token
        },
        async session({ session, token }) {
            // console.log({session, token})
            return {
                ...session,
                user: {
                    ...session.user,
                    name: token.name,
                    _id: token._id,
                    role: token.role,
                    provider: token.provider
                }
            }
        }
    }
}
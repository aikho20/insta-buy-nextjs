/** @type {import('next').NextConfig} */


const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET, MONGODB_URI, NEXTAUTH_URL } = process.env


const nextConfig = {
    experimental: {
        serverActions: true
    },
    env: {
        GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET, MONGODB_URI, NEXTAUTH_URL
    },

};

export default nextConfig;

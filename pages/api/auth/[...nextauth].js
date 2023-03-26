import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '@/lib/prisma'
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export default async function auth(req, res) {
    return await NextAuth(req, res, {
        providers: [
            GithubProvider({
                clientId: process.env.GITHUB_ID,
                clientSecret: process.env.GITHUB_SECRET,
                authorization: {
                    params: {
                        prompt: "consent",
                        access_type: "offline",
                        response_type: "code"
                    }
                }
            }),
            GoogleProvider({
                clientId: process.env.GOOGLE_ID,
                clientSecret: process.env.GOOGLE_SECRET,
                authorization: {
                    params: {
                        prompt: "consent",
                        access_type: "offline",
                        response_type: "code"
                    }
                }
            })
            // ...add more providers here
        ],

        pages: {
            signIn: '/signin'
        },
        adapter: PrismaAdapter(prisma),
        session: {
            strategy: 'jwt'
        }
    })
}
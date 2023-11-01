import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { ObjectId } from 'mongodb'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/lib/mongo/client'

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    })
  ],
  callbacks: {
    async jwt({ token, trigger, session }) {
      if (trigger === 'update' && session?.name) {
        token.name = session.name
      }
      return token
    },
    async session({ session, user }) {
      console.log(user.id)
      session.user._id = user.id
      return session
    }
  },
  pages: {
    signIn: '/signin'
  },
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'database'
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

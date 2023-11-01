import { DefaultSession, DefaultUser } from 'next-auth'
import { ObjectId } from 'mongodb'
declare module 'next-auth' {
  interface Session {
    user: {
      _id: string
    } & DefaultSession['user']
  }
}

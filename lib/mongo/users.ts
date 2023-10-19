import { Db, Collection, MongoClient, ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongo/client'

let client: MongoClient
let db: Db
let users: Collection<Document>

export interface FindUserByIdProps {
  userId: number
}

export interface UpdateUserProps {
  email: string
}

export interface UpdateUserObject {
  [key: string]: any
}

export interface UpdateUserResponse {
  success: boolean
  error?: string
}

async function init() {
  if (db) return
  try {
    client = await clientPromise
    db = await client.db()
    users = await db.collection('users')
  } catch (error) {
    throw new Error('Failed to stablish connection to database')
  }
}

/////////////
/// USERS ///
/////////////

export async function updateUser(
  email: string,
  update: UpdateUserObject
): Promise<UpdateUserResponse> {
  try {
    if (!users) await init()

    await users.updateOne({ email }, { $set: update })

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to reset the password.' }
  }
}

import { Collection, Db, Document, InsertOneResult, MongoClient } from 'mongodb'
import clientPromise from '@/lib/mongo/client'

let client: MongoClient
let db: Db
let guestbook: Collection<Document>

interface EntryResult {
  _id: string,
  name: string,
  message: string,
  updatedAt: Date

}

export interface NewEntryProps {
  name: string,
  message: string
}

type GetGuestbookEntriesResponse = {
  success: boolean,
  data?: EntryResult[],
  error?: string
}

type CreateGuestbookEntryResponse = {
  success: boolean;
  data?: InsertOneResult<Document>,
  error?: string,
}

async function init() {
  if (db) return
  try {
    client = await clientPromise
    db = client.db()
    guestbook = db.collection('guestbook')
  } catch (error) {
    throw new Error('Failed to connect to the database.')
  }
}

;(async () => {
  await init()
})()

/////////////////
/// Guestbook ///
////////////////


//Promise<{entries: EntryResult[]} | {error: string}>
export const getGuestbookEntries = async (): Promise<GetGuestbookEntriesResponse> => {
  try {
    if (!guestbook) await init()

    console.log('fetching entries...')

    const entries = await guestbook
      .find({})
      .map((entry): EntryResult => ({_id: entry._id.toString(), name: entry.name, message: entry.message, updatedAt: entry.date }))
      .toArray()
    return { success: true, data: entries }
  } catch (error) {
    return { success: false, error: 'Failed to fetch guestbook!' }
  }
}

export const createGuestbookEntry = async ({ name, message }:NewEntryProps): Promise<CreateGuestbookEntryResponse> => {
  try {
    if (!guestbook) await init()

    const result = await guestbook.insertOne({ name, message, updatedAt: new Date() })
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: 'Failed to create entry!' };
  }
}
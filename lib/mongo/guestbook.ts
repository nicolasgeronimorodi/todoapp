import {
  ObjectId,
  Collection,
  Db,
  Document,
  InsertOneResult,
  DeleteResult,
  MongoClient,
  UpdateResult
} from 'mongodb'
import clientPromise from '@/lib/mongo/client'
import { number, string } from 'zod'

let client: MongoClient
let db: Db
let guestbook: Collection<Document>

interface EntryResult {
  _id: string
  name: string
  message: string
  done?: boolean
  updatedAt: Date
}

export interface NewEntryProps {
  userId: string
  name: string
  message: string
  scheduledDate: Date
}

type GetGuestbookEntriesResponse = {
  success: boolean
  data?: EntryResult[]
  error?: string
}

type CreateGuestbookEntryResponse = {
  success: boolean
  data?: InsertOneResult<Document>
  error?: string
}

type DeleteGuestbookEntryResponse = {
  success: boolean
  data?: DeleteResult
  error?: string
}

type UpdateGuestbookEntryResponse = {
  success: boolean
  data?: UpdateResult
  error?: string
}

export interface UpdateEntryObject {
  [key: string]: any
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

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

//Promise<{entries: EntryResult[]} | {error: string}>
export const getGuestbookEntries =
  async (): Promise<GetGuestbookEntriesResponse> => {
    try {
      if (!guestbook) await init()

      const entries = await guestbook
        .find({})
        .map(
          (entry): EntryResult => ({
            _id: entry._id.toString(),
            name: entry.name,
            message: entry.message,
            done: entry.done,
            updatedAt: entry.date
          })
        )
        .toArray()
      console.log('fetching entries...', entries)
      return { success: true, data: entries }
    } catch (error) {
      return { success: false, error: 'Failed to fetch guestbook!' }
    }
  }

export const createGuestbookEntry = async ({
  userId,
  name,
  message,
  scheduledDate
}: NewEntryProps): Promise<CreateGuestbookEntryResponse> => {
  try {
    if (!guestbook) await init()

    const result = await guestbook.insertOne({
      userId,
      name,
      message,
      scheduledDate,
      updatedAt: new Date()
    })
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed to create entry!' }
  }
}

export const deleteGuestbookEntry = async (
  id: string
): Promise<DeleteGuestbookEntryResponse> => {
  try {
    if (!guestbook) await init()

    const query = { _id: new ObjectId(id) }
    const result = await guestbook.deleteOne(query)
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed to delete entry' }
  }
}

export const updateGuestbookEntry = async (
  id: string,
  update: UpdateEntryObject
): Promise<UpdateGuestbookEntryResponse> => {
  try {
    if (!guestbook) await init()

    //const query = { _id: new ObjectId(id) }
    const objectId = new ObjectId(id)
    const result = await guestbook.updateOne(
      { _id: objectId },
      { $set: update }
    )
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Failed to update entry' }
  }
}

export const searchTodos = async ({
  userId,
  query,
  page = 1,
  limit = 10
}: {
  userId: string
  query?: string
  page: number
  limit: number
}) => {
  try {
    if (!guestbook) await init()
    const skip = (page - 1) * limit
    const pipeline: PipelineStage[] = [
      { $match: { userId: userId } },
      { $skip: skip },
      { $limit: limit }
    ]
    if (query) {
      pipeline.unshift({
        $search: {
          index: 'default',
          text: {
            query,
            fuzzy: {
              maxEdits: 1,
              prefixLength: 3,
              maxExpansions: 50
            },
            path: {
              wildcard: '*'
            }
          }
        }
      })
    }

    const entries = await guestbook
      .aggregate(pipeline)
      .map(
        (entry): EntryResult => ({
          _id: entry._id.toString(),
          name: entry.name,
          message: entry.message,
          done: entry.done,
          updatedAt: entry.date
        })
      )
      .toArray()
    return { success: true, data: entries }
  } catch (error) {
    return { success: false, error: 'Failed to fetch guestbook!' }
  }
}

type PipelineStage =
  | {
      $search: {
        index: string
        text: {
          query: string
          fuzzy: {}
          path: {
            wildcard: string
          }
        }
      }
    }
  | {
      $skip: number
    }
  | {
      $limit: number
    }
  | {
      $match: {
        userId: string
      }
    }

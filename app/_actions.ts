'use server'

interface UpdateTodoItemObject {
  name?: string
  message?: string
  done?: boolean
}

//import {z} from 'zod';
import { GuestEntrySchema, UpdateEntrySchema } from '@/lib/zod/schema'
import { updateUser } from '@/lib/mongo/users'
import {
  createGuestbookEntry,
  deleteGuestbookEntry,
  updateGuestbookEntry
} from '@/lib/mongo/guestbook'
import { revalidatePath } from 'next/cache'

export async function updateName({
  email,
  name
}: {
  email: string
  name: string
}) {
  await updateUser(email, { name })
}

export async function updateTodoItem(
  id: string,
  { name, message, done }: UpdateTodoItemObject
) {
  console.log('name, message, done: ', name, message, done)
  const updateFields: UpdateTodoItemObject = {}
  if (name !== undefined && name !== null) {
    updateFields.name = name
  }
  if (message !== undefined && message !== null) {
    updateFields.message = message
  }

  if (done !== undefined && done !== null) {
    updateFields.done = done
  }

  const result = UpdateEntrySchema.safeParse(updateFields)
  if (!result.success) {
    return { error: result.error.format() }
  }

  const response = await updateGuestbookEntry(id, updateFields)
  if (!response.success) {
    throw new Error(response.error)
  }
  revalidatePath('/')
}

export async function addGuestbookEntry(data: any) {
  const { userId } = data

  //Start of action level validation
  const result = GuestEntrySchema.safeParse(data)
  if (!result.success) {
    return { error: result.error.format() }
  }
  const { name, message, scheduledDate } = result.data
  //End of action level validation

  const response = await createGuestbookEntry({
    userId,
    name,
    message,
    scheduledDate
  })
  if (!response.success) {
    throw new Error(response.error)
  }
  revalidatePath('/')
}

export async function updateTodoItemTitle(id: string, name: string) {
  const response = await updateGuestbookEntry(id, { name })
  if (!response.success) {
    throw new Error(response.error)
  }
}

export async function updateTodoItemDescription(id: string, message: string) {
  const response = await updateGuestbookEntry(id, { message })
  if (!response.success) {
    throw new Error(response.error)
  }
}

export async function deleteTodoItem(id: string) {
  const response = await deleteGuestbookEntry(id)
  if (!response.success) {
    throw new Error(response.error)
  }
  revalidatePath('/')
}

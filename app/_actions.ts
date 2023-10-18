'use server'

//import {z} from 'zod';
import { GuestEntrySchema } from '@/lib/zod/schema'
import { updateUser } from '@/lib/mongo/users'
import { createGuestbookEntry, deleteGuestbookEntry } from '@/lib/mongo/guestbook';
import { revalidatePath } from 'next/cache';

export async function updateName({email, name}:{email: string, name:string}) {
  await updateUser(email, { name })
}

export async function addGuestbookEntry(data: unknown){

  //Start of action level validation
  const result = GuestEntrySchema.safeParse(data);
  if(!result.success){
    return {error: result.error.format()}
}
const {name, message}=result.data
//End of action level validation

const response= await createGuestbookEntry({name, message});
if(!response.success){
  throw new Error(response.error)
}
revalidatePath('/')

}

export async function deleteTodoItem(id: string){
  const response = await deleteGuestbookEntry(id);
  if(!response.success){
    throw new Error(response.error)
  }
  revalidatePath('/')
}

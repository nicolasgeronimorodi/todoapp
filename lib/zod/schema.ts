import { z } from 'zod'

export const GuestEntrySchema = z.object({
  name: z.string().min(1, { message: 'Title is required' }),
  message: z.string().min(1, { message: 'Description is required' })
})

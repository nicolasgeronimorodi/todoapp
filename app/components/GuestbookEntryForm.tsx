'use client'

import { addGuestbookEntry } from '@/app/_actions'
import { useRef, useState } from 'react'

const GuestbookEntryForm = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [validationError, setValidationError] = useState<any>(null)

  // client action calling a server action
  async function action(data: FormData) {
    const newEntry = {
      name: data.get('name'),
      message: data.get('message')
    }
    const result = await addGuestbookEntry(newEntry)
    if (result?.error) {
      setValidationError(result.error)
    } else {
      formRef.current?.reset()
      setValidationError(null)
    }
  }

  return (
    <form
      ref={formRef}
      className='flex max-w-sm flex-col gap-y-3 text-sm'
      action={action}
    >
      <input
        type='text'
        name='name'
        placeholder='Title'
        className='rounded border border-gray-600 bg-transparent px-3 py-1 dark:border-gray-600'
      />
      {validationError?.name && (
        <p className='text-sm text-red-400'>
          {validationError.name._errors.join(', ')}
        </p>
      )}
      <input
        type='text'
        name='message'
        placeholder='Task description...'
        className='rounded border border-gray-600 bg-transparent px-3 py-1 dark:border-gray-600'
      />
      {validationError?.message && (
        <p className='text-sm text-red-400'>
          {validationError.message._errors.join(', ')}
        </p>
      )}
      <button
        type='submit'
        className='rounded bg-black px-3 py-1 text-white disabled:opacity-50 dark:bg-white dark:text-black'
      >
        Add
      </button>
    </form>
  )
}

export default GuestbookEntryForm

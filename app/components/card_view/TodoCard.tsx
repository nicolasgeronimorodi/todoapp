'use client'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shadcn/ui/card'

import { deleteTodoItem, updateTodoItem } from '../../_actions'

import { TodoItem } from '@/lib/types/TodoItem'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import SubmitButton from '../SubmitButton'
import { useState } from 'react'
interface TodoCardProps {
  todo: TodoItem
}

export default function TodoCard({ todo }: TodoCardProps) {
  const [isEditing, setEditing] = useState(false)
  const [editedName, setEditedName] = useState(todo.name)
  const [editedMessage, setEditedMessage] = useState(todo.message)

  //Controlling which input is being edited

  const [nameEdited, setNameEdited] = useState(false)
  const [messageEdited, setMessageEdited] = useState(false)
  const handleEditClick = () => {
    setEditing(true)
  }

  const handleConfirmClick = async () => {
    if (nameEdited && messageEdited) {
      console.log('both fields got edited')
      updateTodoItem(todo._id, { name: editedName, message: editedMessage })
    } else if (nameEdited) {
      console.log('title field got edited')
      await updateTodoItem(todo._id, { name: editedName })
    } else if (messageEdited) {
      console.log('description field got edited')
      await updateTodoItem(todo._id, { message: editedMessage })
    }

    setEditing(false)
  }

  const handleCancelClick = () => {
    // Reset edited values and exit edit mode
    setEditedName(todo.name)
    setEditedMessage(todo.message)
    setNameEdited(false)
    setMessageEdited(false)
    setEditing(false)
  }

  return (
    <Card className='group relative border border-zinc-600'>
      <div className='mb-2 flex'>
        <form className=' items-center '>
          {isEditing ? (
            <>
              <CardHeader>
                <CardTitle>
                  <input
                    type='text'
                    className='mr-2 rounded border border-gray-300 px-2 py-1'
                    value={editedName}
                    onChange={e => {
                      setEditedName(e.target.value)
                      setNameEdited(true)
                    }}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <input
                  type='text'
                  className='mr-2 rounded border border-gray-300 px-2 py-1'
                  value={editedMessage}
                  onChange={e => {
                    setEditedMessage(e.target.value)
                    setMessageEdited(true)
                  }}
                />
              </CardContent>
              <SubmitButton
                style='mr-2'
                formAction={() => {
                  handleConfirmClick()
                }}
              >
                <p className='rounded-md hover:bg-zinc-400 dark:hover:bg-slate-700'>
                  Confirm
                </p>
              </SubmitButton>
              <button onClick={handleCancelClick}>
                <p className='rounded-md hover:bg-zinc-400 dark:hover:bg-slate-700'>
                  Cancel
                </p>
              </button>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle>{todo.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{todo.message}</p>
              </CardContent>
            </>
          )}

          <CardFooter>
            <div className='absolute right-0 mt-5'>
              <div className='duration-50 -translate-y-1/2 transform opacity-0 transition group-hover:opacity-100'>
                <button type='button' onClick={handleEditClick}>
                  <PencilIcon className='h-5 w-5 text-blue-600' />
                </button>

                <button
                  formAction={async () => {
                    await deleteTodoItem(todo._id)
                  }}
                >
                  <TrashIcon className='h-5 w-5 text-red-600' />
                </button>
              </div>
            </div>
          </CardFooter>
        </form>
      </div>
    </Card>
  )
}

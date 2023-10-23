'use client'
import { useState } from 'react'
import { deleteTodoItem, updateTodoItem } from '../_actions'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import { TodoItem } from '@/lib/types/TodoItem'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shadcn/ui/card'

interface TodoItemProps {
  todo: TodoItem
}
function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setEditing] = useState(false)
  const [editedName, setEditedName] = useState(todo.name)
  const [editedMessage, setEditedMessage] = useState(todo.message)

  //Controlling which input is being edited

  const [nameEdited, setNameEdited] = useState(false)
  const [messageEdited, setMessageEdited] = useState(false)

  const handleEditClick = () => {
    setEditing(true)
  }
  const handleCancelClick = () => {
    // Reset edited values and exit edit mode
    setEditedName(todo.name)
    setEditedMessage(todo.message)
    setNameEdited(false)
    setMessageEdited(false)
    setEditing(false)
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

  return (
    <Card>
      <form className='mb-2 flex items-center'>
        {isEditing ? (
          <>
            <input
              type='text'
              className='mr-2 rounded border border-gray-300 px-2 py-1'
              value={editedName}
              onChange={e => {
                setEditedName(e.target.value)
                setNameEdited(true)
              }}
            />
            <input
              type='text'
              className='mr-2 rounded border border-gray-300 px-2 py-1'
              value={editedMessage}
              onChange={e => {
                setEditedMessage(e.target.value)
                setMessageEdited(true)
              }}
            />
            <button
              formAction={() => {
                handleConfirmClick()
              }}
              className='mr-2'
            >
              Confirm
            </button>
            <button onClick={handleCancelClick}>Cancel</button>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle>{todo.name}</CardTitle>
              <CardDescription>{todo.message}</CardDescription>
            </CardHeader>

            <CardFooter>
              <div className='relative mb-1 inline-block'>
                <div className='absolute right-0 top-1/2 -translate-y-1/2 transform opacity-0 transition duration-300 group-hover:opacity-100'>
                  <button onClick={handleEditClick}>
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
          </>
        )}
      </form>
    </Card>
  )
}

export default TodoItem

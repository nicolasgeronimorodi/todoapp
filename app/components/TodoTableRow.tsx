'use client'
import { useState } from 'react'
import { TodoItem } from '@/lib/types/TodoItem'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import { TableCell, TableRow } from '@/shadcn/ui/table'

import { deleteTodoItem, updateTodoItem } from '../_actions'
interface TodoTableRowProps {
  todo: TodoItem
}

function TodoTableRow({ todo }: TodoTableRowProps) {
  const [isEditing, setIsEditing] = useState(false)

  const [editedName, setEditedName] = useState(todo.name)
  const [editedMessage, setEditedMessage] = useState(todo.message)

  //Controlling which input is being edited

  const [nameGotEdited, setNameGotEdited] = useState(false)
  const [messageGotEdited, setMessageGotEdited] = useState(false)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancelClick = () => {
    // Reset edited values and exit edit mode
    setEditedName(todo.name)
    setEditedMessage(todo.message)
    setNameGotEdited(false)
    setMessageGotEdited(false)
    setIsEditing(false)
  }

  const handleConfirmClick = async () => {
    if (nameGotEdited && messageGotEdited) {
      console.log('both fields got edited')
      updateTodoItem(todo._id, { name: editedName, message: editedMessage })
    } else if (nameGotEdited) {
      console.log('title field got edited')
      await updateTodoItem(todo._id, { name: editedName })
    } else if (messageGotEdited) {
      console.log('description field got edited')
      await updateTodoItem(todo._id, { message: editedMessage })
    }

    setIsEditing(false)
  }

  return (
    <form>
      <TableRow>
        {isEditing ? (
          <>
            <TableCell className='text-center font-medium'>
              <input
                type='text'
                className='mr-2 rounded border border-gray-300 px-2 py-1'
                value={editedName}
                onChange={e => {
                  setEditedName(e.target.value)
                  setNameGotEdited(true)
                }}
              />
            </TableCell>
            <TableCell className='text-center'>
              <input
                type='text'
                className='mr-2 rounded border border-gray-300 px-2 py-1'
                value={editedMessage}
                onChange={e => {
                  setEditedMessage(e.target.value)
                  setMessageGotEdited(true)
                }}
              />
            </TableCell>
          </>
        ) : (
          <>
            <TableCell className='text-center font-medium'>
              {todo.name}l
            </TableCell>
            <TableCell className='text-center'>{todo.message}</TableCell>
            <TableCell className='flex justify-center space-x-4'>
              <div>
                <button onClick={handleEditClick}>
                  <PencilIcon className='h-5 w-5 text-blue-600' />
                </button>
              </div>
              <div>
                <button
                  formAction={async () => {
                    await deleteTodoItem(todo._id)
                  }}
                >
                  <TrashIcon className='h-5 w-5 text-red-600' />
                </button>
              </div>
            </TableCell>
          </>
        )}
      </TableRow>
    </form>
  )
}

export default TodoTableRow

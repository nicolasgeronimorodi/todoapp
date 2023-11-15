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
import { Checkbox } from '@/shadcn/ui/checkbox'
import { Badge } from '@/shadcn/ui/badge'
import { TailSpin } from 'react-loader-spinner'
interface TodoCardProps {
  todo: TodoItem
}

export default function TodoCard({ todo }: TodoCardProps) {
  const [isEditing, setEditing] = useState(false)
  const [editedName, setEditedName] = useState(todo.name)
  const [editedMessage, setEditedMessage] = useState(todo.message)
  const [isCheckingDone, setIsCheckingDone] = useState(false)

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

  const handleCheckedChange = async () => {
    setIsCheckingDone(true)
    await updateTodoItem(todo._id, { done: !todo.done })
    setIsCheckingDone(false)
  }

  return (
    <Card
      className={`group relative ${
        todo.done
          ? 'rounded-md border border-emerald-500'
          : 'border border-zinc-600'
      }`}
    >
      <div className='mb-2 ml-5 flex flex-row justify-start'>
        <form className='items-center '>
          {isEditing ? (
            <>
              <CardHeader>
                <CardTitle>
                  <input
                    type='text'
                    className='mr-2 mt-2 rounded border border-gray-300 px-2 py-1 text-lg'
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
                  className='mr-2 mt-2 rounded border border-gray-300 px-2 py-1 text-lg'
                  value={editedMessage}
                  onChange={e => {
                    setEditedMessage(e.target.value)
                    setMessageEdited(true)
                  }}
                />
              </CardContent>
              <SubmitButton
                style='mr-2 bg-indigo-500 p-1 border border-0 rounded-md hover:bg-zinc-400 dark:hover:bg-slate-700'
                formAction={() => {
                  handleConfirmClick()
                }}
              >
                <p className='rounded-md text-sm text-zinc-200'>Confirm</p>
              </SubmitButton>
              <button
                onClick={handleCancelClick}
                className='rounded-md border-0 bg-rose-800 p-1 hover:bg-zinc-400 dark:hover:bg-slate-700'
              >
                <p className='rounded-md text-sm text-zinc-200'>Cancel</p>
              </button>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle>{todo.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{todo.message}</p>

                <div className='mb-2 mt-2 flex flex-row gap-2'>
                  <Badge variant='secondary' className='border-zinc-600 p-2'>
                    <p className='text-xs'>Hecho: </p>
                  </Badge>

                  <Checkbox
                    checked={todo.done}
                    disabled={isCheckingDone}
                    onCheckedChange={handleCheckedChange}
                    className='border-1 ml-2 mr-2 mt-2 h-5 w-5 rounded-sm border border-zinc-500'
                    id='done'
                  />

                  {isCheckingDone && (
                    <TailSpin
                      height='20'
                      width='20'
                      color='#4fa94d'
                      ariaLabel='tail-spin-loading'
                      radius='1'
                      visible={true}
                      wrapperClass='bg-inherit'
                    />
                  )}
                </div>

                <div className='mb-2 mt-2 flex flex-row gap-2'>
                  <Badge variant='secondary' className='border-zinc-600 p-2'>
                    <p className='text-xs'>Fechado: </p>
                  </Badge>
                  <p className='mt-2 text-sm'>
                    {todo.scheduledDate.toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </>
          )}

          <CardFooter>
            <div className='absolute right-0 mt-5'>
              <div className='duration-50 -translate-y-1/2 transform opacity-0 transition group-hover:opacity-100'>
                <button type='button' onClick={handleEditClick}>
                  <PencilIcon className='h-5 w-5 text-blue-600' />
                </button>

                <SubmitButton
                  formAction={async () => {
                    await deleteTodoItem(todo._id)
                  }}
                >
                  <TrashIcon className='h-5 w-5 text-red-600' />
                </SubmitButton>
              </div>
            </div>
          </CardFooter>
        </form>
      </div>
    </Card>
  )
}

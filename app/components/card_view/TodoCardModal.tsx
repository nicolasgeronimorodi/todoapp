'use client'
import { TodoItem } from '@/lib/types/TodoItem'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/shadcn/ui/dialog'
import { Badge } from '@/shadcn/ui/badge'
import { Checkbox } from '@/shadcn/ui/checkbox'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from '@/shadcn/ui/button'
import SubmitButton from '../SubmitButton'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { DatePickerDemo } from '../DatePicker'
import { deleteTodoItem, updateTodoItem } from '../../_actions'
interface TodoCardProps {
  todo: TodoItem
}

export default function TodoCardModal({ todo }: TodoCardProps) {
  const [isEditing, setEditing] = useState(false)
  const [editedName, setEditedName] = useState(todo.name)
  const [editedMessage, setEditedMessage] = useState(todo.message)
  const [editedDate, setEditedDate] = useState<Date | undefined>()
  const [isCheckingDone, setIsCheckingDone] = useState(false)

  //Controlling which input is being edited

  const [nameEdited, setNameEdited] = useState(false)
  const [messageEdited, setMessageEdited] = useState(false)
  const [dateEdited, setDateEdited] = useState(false)

  const handleEditClick = () => {
    setEditing(true)
  }

  const switchHandleConfirmClick = async () => {
    switch (true) {
      case nameEdited && messageEdited && dateEdited:
        console.log('All fields got edited')
        await updateTodoItem(todo._id, {
          name: editedName,
          message: editedMessage,
          scheduledDate: editedDate
        })
        break
      case nameEdited && messageEdited:
        console.log('Name and message fields got edited')
        await updateTodoItem(todo._id, {
          name: editedName,
          message: editedMessage
        })
        break
      case nameEdited && dateEdited:
        console.log('Name and fooDate fields got edited')
        await updateTodoItem(todo._id, {
          name: editedName,
          scheduledDate: editedDate
        })
        break
      case messageEdited && dateEdited:
        console.log('Message and fooDate fields got edited')
        await updateTodoItem(todo._id, {
          message: editedMessage,
          scheduledDate: editedDate
        })
        break
      case nameEdited:
        console.log('Name field got edited')
        await updateTodoItem(todo._id, { name: editedName })
        break
      case messageEdited:
        console.log('Message field got edited')
        await updateTodoItem(todo._id, { message: editedMessage })
        break
      case dateEdited:
        console.log('editedDate field got edited')
        await updateTodoItem(todo._id, { scheduledDate: editedDate })
        break
      default:
        console.log('No fields got edited')
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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className=' w-13 mb-0.2 fixed  bottom-[20%] right-[100%] h-6 rounded-md border border-zinc-700'
          //variant='ghost'
        >
          <p className='text-xs'>Expandir </p>
        </Button>
      </DialogTrigger>
      <form>
        <DialogContent className='fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-slate-900 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
          {isEditing ? (
            <>
              <DialogHeader>
                <DialogTitle>
                  <input
                    type='text'
                    className='mr-2 mt-2 rounded border border-gray-300 px-2 py-1 text-lg'
                    value={editedName}
                    onChange={e => {
                      setEditedName(e.target.value)
                      setNameEdited(true)
                    }}
                  />
                </DialogTitle>
                <DialogDescription>
                  <input
                    type='text'
                    className='mr-2 mt-2 rounded border border-gray-300 px-2 py-1 text-lg'
                    value={editedName}
                    onChange={e => {
                      setEditedName(e.target.value)
                      setNameEdited(true)
                    }}
                  />
                </DialogDescription>
              </DialogHeader>
              <div className='mt-2'>
                <DatePickerDemo
                  onSelectDate={() => {
                    setDateEdited(true)
                  }}
                  selectedDate={editedDate}
                  onDateChange={setEditedDate}
                />
              </div>
              <SubmitButton
                style='mr-2 bg-indigo-500 p-1 border border-0 rounded-md hover:bg-zinc-400 dark:hover:bg-slate-700 mt-1'
                formAction={() => {
                  switchHandleConfirmClick()
                }}
              >
                <p className='rounded-md text-sm text-zinc-200'>Confirm</p>
              </SubmitButton>
              <button
                onClick={handleCancelClick}
                className='mt-1 rounded-md border-0 bg-rose-800 p-1 hover:bg-zinc-400 dark:hover:bg-slate-700'
              >
                <p className='rounded-md text-sm text-zinc-200'>Cancel</p>
              </button>
            </>
          ) : (
            <DialogHeader>
              <DialogTitle>{todo.name}</DialogTitle>
              <DialogDescription>{todo.message}</DialogDescription>
              <div className='mb-2 mt-2 flex flex-row gap-2'>
                <Badge variant='secondary' className='border-zinc-600 p-2'>
                  <p className='text-xs'>Hecho: </p>
                </Badge>

                <Checkbox
                  className='border-1 ml-2 mr-2 mt-2 h-5 w-5 rounded-sm border border-zinc-500'
                  id='done'
                />
              </div>
              <div className='mb-2 mt-2 flex flex-row gap-2'>
                <Badge variant='secondary' className='border-zinc-600 p-2'>
                  <p className='text-xs'>Fechado: </p>
                </Badge>
                <p className='mt-2 text-sm'>Viernes 5 de julio, 2024</p>
              </div>
            </DialogHeader>
          )}

          <DialogFooter>
            <div className='right-0'>
              <button type='button' onClick={handleEditClick}>
                <PencilIcon className='h-5 w-5 text-blue-600' />
              </button>

              <SubmitButton>
                <TrashIcon className='h-5 w-5 text-red-600' />
              </SubmitButton>
            </div>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

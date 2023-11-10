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
interface TodoCardProps {
  todo: TodoItem
}

export default function TodoCard({ todo }: TodoCardProps) {
  const handleEditClick = () => {
    console.log('editing')
  }

  return (
    <Card className='group relative border border-zinc-600'>
      <div className='flex justify-center '>
        <form className='mb-2 items-center '>
          <CardHeader>
            <CardTitle>{todo.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{todo.message}</p>
          </CardContent>
          <CardFooter>
            <div className='absolute right-0 mt-5'>
              <div className='duration-50 -translate-y-1/2 transform opacity-0 transition group-hover:opacity-100'>
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
        </form>
      </div>
    </Card>
  )
}

'use client'
import { ColumnDef } from '@tanstack/react-table'

import { TodoItem } from '@/lib/types/TodoItem'

import { Button } from '@/shadcn/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/shadcn/ui/dropdown-menu'

import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import { deleteTodoItem } from '@/app/_actions'

export const columns: ColumnDef<TodoItem>[] = [
  {
    accessorKey: 'name',
    header: () => <div className='text-center font-black'>Title</div>,
    cell: ({ row }) => {
      return <div className='text-center'>{row.getValue('name')}</div>
    }
  },
  {
    accessorKey: 'message',
    header: () => <div className='text-center font-black'>Description</div>,
    cell: ({ row }) => {
      return <div className='text-center'>{row.getValue('message')}</div>
    }
  },

  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const todo = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <EllipsisHorizontalIcon className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='bg-slate-800'>
            <DropdownMenuLabel className='font-light'>
              Actions
            </DropdownMenuLabel>
            <form className='mb-2 flex items-center'>
              <button
                formAction={async () => {
                  await deleteTodoItem(todo._id)
                }}
              >
                <TrashIcon className='h-5 w-5 text-red-600' />
              </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

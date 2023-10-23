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
      return <div className='text-center'>{row.getValue('name')}</div>
    }
  },

  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
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
            <DropdownMenuItem>
              <TrashIcon className='h-5 w-5 text-red-600' />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

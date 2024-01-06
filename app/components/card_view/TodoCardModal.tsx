import { TodoItem } from '@/lib/types/TodoItem'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/shadcn/ui/dialog'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from '@/shadcn/ui/button'
import React from 'react'
interface TodoCardProps {
  todo: TodoItem
}

export default function TodoCardModal({ todo }: TodoCardProps) {
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
      <DialogContent className='fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-slate-900 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
        <DialogHeader>
          <DialogTitle>{todo.name}</DialogTitle>
          <DialogDescription>{todo.message}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

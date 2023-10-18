import { deleteTodoItem } from '../_actions'
import {TrashIcon} from '@heroicons/react/24/outline'
import { TodoItem } from '@/lib/types/TodoItem'

interface TodoItemProps{
    todo: TodoItem
}
function TodoItem({todo}: TodoItemProps) {
  return (
    <>
    <form>
    <span className='text-slate-900 text-black dark:text-neutral-400'>{todo.name}:</span>
    <span className='mr-5'>{todo.message}</span>
    <div className='relative inline-block'>
    <div className='absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-300'>
    <button formAction={async()=>{
      'use server'
      await deleteTodoItem(todo._id)
    }}>
    <TrashIcon className='h-5 w-5 text-red-600' />
    </button>
    </div>  
    </div>
    </form>
    </>
    
  )
}

export default TodoItem
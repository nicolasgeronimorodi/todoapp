import { deleteTodoItem } from '../_actions'
import {TrashIcon} from '@heroicons/react/24/outline'
import { TodoItem } from '@/lib/types/TodoItem'

interface TodoItemProps{
    todo: TodoItem
}
function TodoItem({todo}: TodoItemProps) {
  return (
    <>
    <span className='text-slate-900 text-black dark:text-neutral-400'>{todo.name}:</span>
    <span>{todo.message}</span>
    <div>
    <div className='absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-300'>
                <TrashIcon />
    </div>  
    </div>
    </>
    
  )
}

export default TodoItem
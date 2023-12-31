import { TodoItem } from '@/lib/types/TodoItem'
import TodoCard from './TodoCard'
interface TodoCardGridProps {
  todos: TodoItem[]
}
export default function TodoCardGrid({ todos }: TodoCardGridProps) {
  return (
    <div className='my-5 grid auto-rows-fr grid-rows-2 gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {todos.map((item, index) => (
        <div
          key={index}
          className='rounded-md border border-zinc-600 sm:col-span-1  md:col-span-2 lg:col-span-1'
        >
          <TodoCard todo={item} />
        </div>
      ))}
    </div>
  )
}

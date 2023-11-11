import { TodoItem } from '@/lib/types/TodoItem'
import TodoCard from './TodoCard'
interface TodoCardGridProps {
  todos: TodoItem[]
}
export default function TodoCardGrid({ todos }: TodoCardGridProps) {
  return (
    <div className='my-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
      {todos.map((item, index) => (
        <div
          key={index}
          className='col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1'
        >
          <TodoCard todo={item} />
        </div>
      ))}
    </div>
  )
}

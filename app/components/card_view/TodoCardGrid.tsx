import { TodoItem } from '@/lib/types/TodoItem'
import TodoCard from './TodoCard'
interface TodoCardGridProps {
  todos: TodoItem[]
}
export default function TodoCardGrid({ todos }: TodoCardGridProps) {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>
      {todos.map((item, index) => (
        <div
          key={index}
          className={`col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 ${
            index >= 4 ? 'sm:col-span-2 md:col-span-2 lg:col-span-2' : ''
          }`}
        >
          <TodoCard todo={item} />
        </div>
      ))}
    </div>
  )
}

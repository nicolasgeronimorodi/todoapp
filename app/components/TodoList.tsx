import TodoItem from './TodoItem'
interface TodoListProps {
  todos: TodoItem[]
}

function TodoList({ todos }: TodoListProps) {
  return (
    <ul className='mt-8 flex flex-col gap-y-2'>
      {todos.map(e => (
        <li key={e._id} className='group relative flex gap-x-3'>
          <TodoItem todo={{ _id: e._id, name: e.name, message: e.message }} />
        </li>
      ))}
    </ul>
  )
}

export default TodoList

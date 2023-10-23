import { DataTable } from './ReusableTable'
import { TodoItem } from '@/lib/types/TodoItem'
import { columns } from './TodoTableColumns/columns'

interface TodoTableProps {
  todos: TodoItem[]
}

export default async function TodoTable({ todos }: TodoTableProps) {
  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={columns} data={todos} />
    </div>
  )
}

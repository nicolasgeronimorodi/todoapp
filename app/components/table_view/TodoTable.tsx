//import { DataTable } from './ReusableTable'
//import { columns } from './TodoTableColumns/columns'

import { TodoItem } from '@/lib/types/TodoItem'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/shadcn/ui/table'
interface TodoTableProps {
  todos: TodoItem[]
}
import TodoTableRow from './TodoTableRow'

export default async function TodoTable({ todos }: TodoTableProps) {
  return (
    <div className='mt-3 rounded-md border border-slate-600'>
      <Table>
        <TableHeader>
          <TableRow className='bg-slate-300 dark:bg-slate-800'>
            <TableHead className='text-center font-bold'>Title</TableHead>
            <TableHead className='text-center font-bold'>Description</TableHead>
            <TableHead className='text-center font-bold'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map(e => (
            <TodoTableRow
              todo={{ _id: e._id, name: e.name, message: e.message }}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

{
  /*
        <Table key={e._id}>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center'>Title</TableHead>
              <TableHead className='text-center'>Description</TableHead>
              <TableHead className='text-center'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className='text-center font-medium'>
                {e.name}l
              </TableCell>
              <TableCell className='text-center'>{e.message}</TableCell>
              <TableCell className='flex justify-center space-x-4'>
                <div>
                  <form>
                    <button >
                  <PencilIcon className='h-5 w-5 text-blue-600' />
                  </button>
                  </form>
                </div>
                <div>
                  <TrashIcon className='h-5 w-5 text-red-600' />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
  */
}

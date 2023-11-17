import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { searchTodos } from '@/lib/mongo/guestbook'
import GuestbookEntryForm from '@/app/components/GuestbookEntryForm'
import { Suspense } from 'react'
import { TailSpin } from '@/app/components/TailSpin'
//import TodoTable from '../components/table_view/TodoTable'
import TodoCardGrid from '../components/card_view/TodoCardGrid'
import Search from '../components/Search'
import { TodoItem } from '@/lib/types/TodoItem'
//import TodoList from '../components/list_view/TodoList'
export const dynamic = 'force-dynamic'
import { FilterList } from '../components/FilterList'
async function getData({
  userId,
  page,
  limit,
  query,
  scheduledDateOrder
}: {
  userId: string
  page: number
  limit: number
  query: string | undefined
  scheduledDateOrder?: string
}) {
  const { data, error } = await searchTodos({ userId, page, limit, query })

  if (!data || error) {
    throw new Error('Failed to fetch entries.')
  }
  console.log('data ', data)
  return data
}

const Page = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const page =
    typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
  const limit =
    typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 10

  const search =
    typeof searchParams.search === 'string' ? searchParams.search : undefined

  const scheduledDateOrder =
    typeof searchParams.scheduledDateOrder === 'string'
      ? searchParams.search
      : undefined

  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    redirect('/signin')
  }
  const userId = session?.user._id
  let todos: TodoItem[]
  try {
    if (typeof userId === 'undefined') {
      throw new Error('UserID is undefined')
    }
    todos = await getData({ userId, page, limit, query: search })
  } catch (error) {
    console.error('Error fetching data:', error)
    todos = []
  }

  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='mb-8 text-3xl font-bold'>Planificador</h1>
        <h2 className='mb-5'>
          Escribe tus tareas para que puedas recordarlas luego!
        </h2>

        <GuestbookEntryForm />
        <br></br>

        <div className='flex gap-2'>
          <div className='flex-grow'>
            {' '}
            <Search />
          </div>
          <div className='flex-shrink-0'>
            {' '}
            <FilterList />
          </div>
        </div>

        <Suspense
          fallback={
            <div className='flex justify-center'>
              <TailSpin
                height='80'
                width='80'
                color='#4fa94d'
                ariaLabel='tail-spin-loading'
                radius='1'
                visible={true}
                wrapperClass='bg-inherit'
              />
            </div>
          }
        >
          <TodoCardGrid todos={todos} />
        </Suspense>
      </div>
    </section>
  )
}

export default Page

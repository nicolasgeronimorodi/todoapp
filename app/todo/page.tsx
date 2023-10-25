import { getGuestbookEntries, searchTodos } from '@/lib/mongo/guestbook'
import GuestbookEntryForm from '@/app/components/GuestbookEntryForm'
import { Suspense } from 'react'
import TodoTable from '../components/TodoTable'
import Search from '../components/Search'
import Await from '../components/Await'
export const dynamic = 'force-dynamic'

async function getData() {
  const { data, error } = await getGuestbookEntries()

  if (!data || error) {
    throw new Error('Failed to fetch entries.')
  }
  console.log(data)
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

  const promise = searchTodos({ page, limit, query: search })

  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='mb-8 text-3xl font-bold'>To-Do List</h1>
        <h2 className='mb-5'>
          Write down your tasks so you can remember them later!
        </h2>

        <GuestbookEntryForm />
        <Search />

        <Suspense fallback={<h1>Loading table...</h1>}>
          <Await promise={promise}>
            {({ data }) => <TodoTable todos={data} />}
          </Await>
        </Suspense>
      </div>
    </section>
  )
}

export default Page

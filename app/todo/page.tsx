
import { getGuestbookEntries } from '@/lib/mongo/guestbook'
import GuestbookEntryForm from '@/app/components/GuestbookEntryForm'
import TodoItem from '../components/TodoItem'
import TodoList from '../components/TodoList'
export const dynamic = 'force-dynamic'

async function getData() {
  const { data, error } = await getGuestbookEntries()

  if (!data || error) {
    throw new Error('Failed to fetch entries.')
  }
  console.log(data)
  return data
}

const Page = async () => {
  const entries = await getData()

  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='mb-8 text-3xl font-bold'>To-Do List</h1>

        <GuestbookEntryForm />
        <TodoList todos={entries}/>
        
      </div>
    </section>
  )
}

export default Page
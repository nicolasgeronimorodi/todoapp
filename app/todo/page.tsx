import { getGuestbookEntries } from '@/lib/mongo/guestbook'
import GuestbookEntryForm from '@/app/components/GuestbookEntryForm'

export const dynamic = 'force-dynamic'

async function getData() {
  const { data, error } = await getGuestbookEntries()

  if (!data || error) {
    throw new Error('Failed to fetch entries.')
  }

  return data
}

const Page = async () => {
  const entries = await getData()

  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='mb-8 text-3xl font-bold'>To-Do List</h1>

        <GuestbookEntryForm />

        <ul className='mt-8 flex flex-col gap-y-2'>
          {entries.map(e => (
            <li key={e._id} className='flex gap-x-3'>
              <span className='text-slate-900 text-black dark:text-neutral-400'>{e.name}:</span>
              <span>{e.message}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Page
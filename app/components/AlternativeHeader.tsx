'use client'
import Link from 'next/link'
import SignInButton from './SignInButton'
import ThemeButton from './ThemeButton'
import { usePathname } from 'next/navigation'

const ACTIVE_ROUTE = 'font-bold'

const AlternativeHeader = () => {
  const pathname = usePathname()

  return (
    <header className='flex items-center justify-between p-5'>
      <nav className='flex py-2'>
        <h1 className='mb-1 text-3xl font-black'>todoapp</h1>
        <ul className='ml-2 flex items-center space-x-4 rounded-md border border-zinc-600 px-4 '>
          <li
            className={`hover:underline hover:shadow-lg ${
              pathname === '/' && ACTIVE_ROUTE
            } `}
          >
            <Link href='/'>Home</Link>
          </li>
          <li
            className={`hover:underline hover:shadow-lg ${
              pathname === '/about' && ACTIVE_ROUTE
            } `}
          >
            <Link href='/about'>About</Link>
          </li>
          <li
            className={`hover:underline hover:shadow-lg ${
              pathname === '/todo' && ACTIVE_ROUTE
            } `}
          >
            {' '}
            <Link href='/todo'>ToDo List</Link>
          </li>
        </ul>
      </nav>
      <div className='flex space-x-4'>
        <SignInButton />
        <ThemeButton />
      </div>
    </header>
  )
}

export default AlternativeHeader

/* <h1 className='font-black'>todoapp</h1> */

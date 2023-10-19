import Link from 'next/link'
import SignInButton from './SignInButton'
import ThemeButton from './ThemeButton'

const Header = () => {
  return (
    <header className='flex h-24 flex-col justify-center'>
      <nav className='container'>
        <ul className='flex items-center justify-between gap-8 font-medium tracking-wider'>
          <h1 className='font-bold'>Todo-app</h1>

          <li className='text-sm hover:underline hover:shadow-lg'>
            <Link href='/'>Home</Link>
          </li>
          <li className='text-sm hover:underline hover:shadow-lg'>
            <Link href='/protected/server'>Protected (server)</Link>
          </li>
          <li className='text-sm hover:underline hover:shadow-lg'>
            <Link href='/protected/client'>Protected (client)</Link>
          </li>

          <li className='text-sm '>
            <div>
              {' '}
              <SignInButton />{' '}
            </div>
            <div className='hover:shadow-lg dark:hover:font-bold'>
              {' '}
              <ThemeButton />
            </div>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

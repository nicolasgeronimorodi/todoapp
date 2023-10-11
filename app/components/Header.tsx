import Link from 'next/link'
import SignInButton from './SignInButton'
import ThemeButton from './ThemeButton'

const Header = () => {
  return (
    <header className='flex h-24 flex-col justify-center'>
      <nav className='container'>
        <ul className='flex items-center justify-between gap-8 font-medium tracking-wider'>
        <li>
          <ThemeButton/>
          </li>
          <li className='text-sm hover:shadow-lg hover:underline'>
            <Link href='/'>Home</Link>
          </li>
          <li className='text-sm hover:shadow-lg hover:underline'>
            <Link href='/protected/server'>Protected (server)</Link>
          </li>
          <li className='text-sm hover:shadow-lg hover:underline'>
            <Link href='/protected/client'>Protected (client)</Link>
          </li>
          <li className='text-sm hover:shadow-lg dark:hover:font-bold'>
            <SignInButton />
          </li>
        
        </ul>
      
      </nav>
    </header>
  )
}

export default Header
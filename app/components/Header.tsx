'use client'

import { useTheme } from 'next-themes'
import Link from 'next/link'
import SignInButton from './SignInButton'
import ThemeButton from './ThemeButton'
import { usePathname } from 'next/navigation'
import HeaderLogoSvg from './HeaderLogoSvg'
const ACTIVE_ROUTE = 'font-bold'
// when light mode is active, the fill for svg logo is #272424
const Header = () => {
  //const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { theme } = useTheme()
  /*
  useEffect(() => setMounted(true), [])
  if (mounted) {
    console.log('theme ', theme)
    if (theme === 'light') {
      console.log('light')
    }

    if (theme === 'dark') {
      console.log('dark')
    }
  } */

  return (
    <header className='flex items-center justify-between p-5'>
      <nav className='flex py-2'>
        <div className='flex-row'>
          <HeaderLogoSvg fill='#94C100' />
        </div>

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
            <Link href='/todos'>ToDo List</Link>
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

export default Header

/* <h1 className='font-black'>todoapp</h1> */

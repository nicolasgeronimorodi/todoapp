'use client'
import Link from 'next/link'
import SignInButton from './SignInButton'
import ThemeButton from './ThemeButton'
import { usePathname } from 'next/navigation';

const ACTIVE_ROUTE = 'font-bold';

 

const AlternativeHeader = () => {
const pathname=usePathname();



  return (
<header className="flex items-center justify-between p-5">
    
  <nav className="flex py-2">
  <h1 className='font-black text-3xl mb-1'>todoapp</h1> 
    <ul className="flex items-center border border-zinc-600 rounded-md space-x-4 ml-2 px-4 ">
      <li className={`hover:shadow-lg hover:underline ${pathname === '/' && ACTIVE_ROUTE} `} ><Link href='/'>Home</Link></li>
      <li className={`hover:shadow-lg hover:underline ${pathname === '/about' && ACTIVE_ROUTE} `}><Link href='/about'>About</Link></li>
      <li className={`hover:shadow-lg hover:underline ${pathname === '/todo' && ACTIVE_ROUTE} `}>  <Link href='/todo'>ToDo List</Link></li>
    </ul>
  </nav>
  <div className="flex space-x-4">
        <SignInButton />
        <ThemeButton/>
  </div>
</header>
  )
}

export default AlternativeHeader

/* <h1 className='font-black'>todoapp</h1> */
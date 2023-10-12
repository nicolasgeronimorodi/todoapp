import Link from 'next/link'
import SignInButton from './SignInButton'
import ThemeButton from './ThemeButton'

const AlternativeHeader = () => {
  return (
<header className="flex items-center justify-between p-5">
    
  <nav className="flex py-2">
  <h1 className='font-black text-3xl mb-1'>todoapp</h1> 
    <ul className="flex items-center border border-zinc-600 rounded-md space-x-4 ml-2 px-4 ">
      <li className='hover:shadow-lg hover:underline'><Link href='/'>Home</Link></li>
      <li className='hover:shadow-lg hover:underline'><Link href='/protected/server'>Protected (server)</Link></li>
      <li className='hover:shadow-lg hover:underline'>  <Link href='/protected/client'>Protected (client)</Link></li>
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
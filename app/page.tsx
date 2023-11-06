'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
const Home = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])
  if (!mounted) {
    return null
  }
  return (
    <div className='mx-2 my-10 flex flex-row items-center justify-evenly'>
      <div className='rounded p-8 text-center '>
        <h1 className='text-primary mb-4 text-4xl font-black'>todoapp</h1>
        <p className='mb-6 text-lg'>
          Anotar tareas nunca fue tan facil y simple
        </p>
      </div>
      <div>
        {resolvedTheme === 'dark' ? (
          <img width={400} height={400} src='/undraw_tasks.svg' />
        ) : (
          <img width={400} height={400} src='/undraw_tasks.svg' />
        )}
      </div>
    </div>
  )
}

export default Home

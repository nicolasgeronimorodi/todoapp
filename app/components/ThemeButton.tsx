'use client'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) {
    return null
  }
  return (
    <button
      className='flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700'
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? (
        <SunIcon className='h-5 w-5 text-orange-300' />
      ) : (
        <MoonIcon className='h-5 w-5 text-slate-800' />
      )}
    </button>
  )
}

export default ThemeButton

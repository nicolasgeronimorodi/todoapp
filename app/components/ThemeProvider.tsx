'use client'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

function ThemeProviderComponent({ children }: { children: ReactNode }) {
  return <ThemeProvider attribute='class'>{children}</ThemeProvider>
}

export default ThemeProviderComponent

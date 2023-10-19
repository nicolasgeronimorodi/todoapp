import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SessionProvider from '@/app/components/SessionProvider'
import 'react-toastify/dist/ReactToastify.css'
import AlternativeHeader from './components/AlternativeHeader'
import ThemeProviderComponent from './components/ThemeProvider'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProviderComponent>
            <AlternativeHeader />
            <main className='flex min-h-full grow flex-col'>{children}</main>
          </ThemeProviderComponent>
        </SessionProvider>
      </body>
    </html>
  )
}

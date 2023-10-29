import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SessionProvider from '@/app/components/SessionProvider'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import ThemeProviderComponent from './components/ThemeProvider'
import { SSRProvider } from '@/app/components/bootstrap'
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
            <Header />
            <main className='flex min-h-full grow flex-col'>{children}</main>
          </ThemeProviderComponent>
        </SessionProvider>
      </body>
    </html>
  )
}

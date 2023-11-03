'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSession as useNextAuthSession } from 'next-auth/react'

const useRequireAuth = () => {
  const { data: nextAuthSession, status } = useNextAuthSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') {
      // Loading state while session is being fetched
      return
    }

    if (!nextAuthSession) {
      // Redirect to login page if not authenticated
      // You can customize this logic based on your requirements
      // For example, redirect to a specific login page
      router.push('/')
    }
  }, [nextAuthSession, status, router])

  return { nextAuthSession, status }
}

export default useRequireAuth

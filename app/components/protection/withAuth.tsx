import { useSession } from 'next-auth/react'

const withAuth = (Component: React.FC) => {
  return () => {
    const { data: session, status } = useSession()

    if (status === 'loading') {
      // Loading state while session is being fetched
      return <div>Loading...</div>
    }

    if (!session) {
      // Redirect to login page if not authenticated
      // You can customize this logic based on your requirements
      // For example, redirect to a specific login page
      return <div>Please log in to access this page.</div>
    }

    return <Component />
  }
}

export default withAuth

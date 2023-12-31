import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import GithubSignInButton from '../components/GithubSignInButton'

const SignInPage = async () => {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect('/')
  }

  return (
    <section className='flex min-h-full overflow-hidden pt-16 sm:py-28'>
      <div className='mx-auto flex w-full max-w-2xl flex-col px-4 sm:px-6'>
        <h1 className='text-center text-2xl font-medium tracking-tight  dark:text-slate-50'>
          Sign in to your account
        </h1>

        <div className='sm:rounded-5xl -mx-4 mt-10 flex-auto px-4 py-10 shadow-2xl shadow-gray-900/10 sm:mx-0 sm:flex-none sm:p-24'>
          <GithubSignInButton />
        </div>
      </div>
    </section>
  )
}

export default SignInPage

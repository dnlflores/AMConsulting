'use client'

import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

const GithubLoginButton = () => {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl')
  
    return (
      <button onClick={() => signIn('github', { callbackUrl })}>
        Log in with Github
      </button>
    )
  }
  
  export default GithubLoginButton  
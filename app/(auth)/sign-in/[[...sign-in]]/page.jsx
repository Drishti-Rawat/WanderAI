import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInpage = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <SignIn  afterSignOutUrl='/' />
    </div>
  )
}

export default SignInpage

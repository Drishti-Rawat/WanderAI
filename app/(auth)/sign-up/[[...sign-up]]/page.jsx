import { SignUp } from '@clerk/nextjs'
import React from 'react'

const Signuppage = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <SignUp />
    </div>
  )
}

export default Signuppage

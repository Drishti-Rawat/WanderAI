'use client'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { TreePine } from 'lucide-react'

const Header = () => {
  return (
    <div className='p-3 shadow-sm '>
        <nav className='flex items-center justify-between  px-4 max-w-7xl mx-auto'>
     <h2 className='text-3xl md:text-4xl  font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text tracking-tighter'>wanderai</h2>


     <SignedIn >
             
              <UserButton appearance={{elements:{avatarBox:"h-10 w-10"}}}>
                  <UserButton.MenuItems>
                  <UserButton.Link label='My Trips' labelIcon={<TreePine size={15}/>} href='/my-trips' />
                  {/* <UserButton.Link label='Saved Jobs' labelIcon={<Heart size={15}/>} href='/saved-jobs' /> */}
                  </UserButton.MenuItems>
                 
                 </UserButton>
                 
            </SignedIn>

            <SignedOut>
              {/* <SignInButton/> */}
              <Link href='/sign-in'><Button  className='bg-blue-600 hover:text-white hover:bg-blue-700 text-white px-8 ' >Login</Button></Link>
            </SignedOut>
        </nav>

    </div>
  )
}

export default Header

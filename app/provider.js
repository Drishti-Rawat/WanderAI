// Provider.jsx
'use client'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { UserDetailsContext } from '@/context/UserDetailsContext' 
import axios from 'axios'

const Provider = ({children}) => {
    const {user, isLoaded} = useUser()
    const [userDetails, setUserDetails] = useState(null)

    useEffect(() => {
        user && verifyUser()
    }, [isLoaded])

    const verifyUser = async() => {
        try {
            const response = await axios.post('/api/verify-user', {
                user: user
            })
            setUserDetails(response.data.result)
            console.log("User verified:", response.data)
        } catch (error) {
            console.error("Error verifying user:", error)
        }
    }

    return (
        <UserDetailsContext.Provider value={{userDetails, setUserDetails}}>
            <div>
                {children}
            </div>
        </UserDetailsContext.Provider>
    )
}

export default Provider
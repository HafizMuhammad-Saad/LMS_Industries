import React from 'react'
import {createContext} from 'react'
import { useState } from 'react'

export const AuthContext = createContext()
function Context({children}) {
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)

    const [loading, setLoading] = useState(true)

    const store = {
        user, setUser,
        session, setSession,
        loading, setLoading

    }
  return (
    <>
        <AuthContext.Provider value={store}>
            {children}
        </AuthContext.Provider>
    </>
  )
}

export default Context
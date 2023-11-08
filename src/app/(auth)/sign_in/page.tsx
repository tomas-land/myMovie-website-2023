'use client'
import React from 'react'
import { useState } from 'react'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    return (
      <div>
        <h1>Sign In</h1>
  
        <form>
          <input 
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)} 
          />
  
          <input
            type="password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
  
          <button type="submit">Sign In</button>
        </form>
      </div>
  )
}

export default SignIn
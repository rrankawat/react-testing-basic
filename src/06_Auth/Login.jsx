import { useState } from 'react'

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSumbit = async e => {
    e.preventDefault()

    if (!email || !password) {
      setError('Both fields are required!')
      return
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('token', data.token)
        onLogin(data.user)
      } else {
        setError(data.message || 'Invalid credentials')
      }
    } catch (error) {
      setError('Network error')
    }
  }

  return (
    <form onSubmit={handleSumbit}>
      <h2>Login</h2>
      {error && <p role='alert'>{error}</p>}

      <label htmlFor='email'>Email</label>
      <input
        type='email'
        id='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <label htmlFor='password'>Password</label>
      <input
        type='password'
        id='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button type='submit'>Login</button>
    </form>
  )
}

export default Login

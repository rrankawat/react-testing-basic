import { useState } from 'react'

const Login = ({ onSubmit }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    if (!email || !password) {
      setError('All fields are required!')
      return
    }

    onSubmit({ email, password })
    setEmail('')
    setPassword('')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {error && <p role='alert'>{error}</p>}

      <label htmlFor='email'>Email:</label>
      <input
        type='email'
        id='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <label htmlFor='password'>Password:</label>
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

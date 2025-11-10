import { Routes, Route, Navigate, Link } from 'react-router-dom'

import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token')

  return (
    <>
      <nav>
        <Link to='/'>Home</Link>
        {isAuthenticated ? (
          <Link to='/profile'>Profile</Link>
        ) : (
          <Link to='/login'>Login</Link>
        )}
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/profile'
          element={
            isAuthenticated ? <Profile /> : <Navigate to='/login' replace />
          }
        />
      </Routes>
    </>
  )
}

export default App

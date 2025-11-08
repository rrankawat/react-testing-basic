import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from './Login'

beforeEach(() => {
  global.fetch = jest.fn()
  localStorage.clear()
})

afterEach(() => {
  jest.resetAllMocks()
})

const mockUser = {
  id: 1,
  name: 'Rocky',
  email: 'rocky@test.com',
  password: 'pass1234',
}
const mockToken = 'fake_token_123'

test('Show error if fields are empty', async () => {
  render(<Login onLogin={jest.fn()} />)

  await userEvent.click(screen.getByRole('button', { name: /login/i }))
  expect(await screen.findByRole('alert')).toHaveTextContent(/required/i)
})

test('Handle successful login', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: jest.fn().mockResolvedValueOnce({ user: mockUser, token: mockToken }),
  })

  const handleLogin = jest.fn()
  render(<Login onLogin={handleLogin} />)

  await userEvent.type(screen.getByLabelText(/email/i), 'rocky@test.com')
  await userEvent.type(screen.getByLabelText(/password/i), 'pass1234')
  await userEvent.click(screen.getByRole('button', { name: /login/i }))

  expect(fetch).toHaveBeenCalledWith('/api/login', expect.any(Object))
  await waitFor(() => expect(localStorage.getItem('token')).toBe(mockToken))
  expect(handleLogin).toHaveBeenCalledWith(mockUser)
})

test('Handle invalid credentials', async () => {
  fetch.mockResolvedValueOnce({
    ok: false,
    json: jest.fn().mockResolvedValueOnce({ message: 'Invalid credentials' }),
  })

  render(<Login onLogin={jest.fn()} />)

  await userEvent.type(screen.getByLabelText(/email/i), 'rocky@test.con')
  await userEvent.type(screen.getByLabelText(/password/i), 'pass1235')
  await userEvent.click(screen.getByRole('button', { name: /login/i }))

  expect(await screen.findByRole('alert')).toHaveTextContent(
    /invalid credentials/i
  )
})

test('Handle network error', async () => {
  fetch.mockRejectedValueOnce(new Error('Network error'))

  render(<Login onLogin={jest.fn()} />)

  await userEvent.type(screen.getByLabelText(/email/i), 'rocky@test.com')
  await userEvent.type(screen.getByLabelText(/password/i), 'pass1234')
  await userEvent.click(screen.getByRole('button', { name: /login/i }))

  expect(await screen.findByRole('alert')).toHaveTextContent(/network error/i)
})

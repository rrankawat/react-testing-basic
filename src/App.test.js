import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

beforeEach(() => {
  localStorage.clear()
})

const mockToken = 'fake_token_123'

test('Render Home page by default', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  )

  expect(screen.getByText(/home page/i)).toBeInTheDocument()
})

test('Navigate to Login page when click the link', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  )

  await userEvent.click(screen.getByText(/login/i))
  expect(screen.getByText(/login page/i)).toBeInTheDocument()
})

test('Redirect to Login when visting Profile without token', async () => {
  render(
    <MemoryRouter initialEntries={['/profile']}>
      <App />
    </MemoryRouter>
  )

  expect(screen.getByText(/login page/i)).toBeInTheDocument()
})

test('Render Profile page when authenticated', async () => {
  localStorage.setItem('token', 'fake_token_123')

  render(
    <MemoryRouter initialEntries={['/profile']}>
      <App />
    </MemoryRouter>
  )

  await waitFor(() => expect(localStorage.getItem('token')).toBe(mockToken))
  expect(screen.getByText(/welcome to your profile/i)).toBeInTheDocument()
})

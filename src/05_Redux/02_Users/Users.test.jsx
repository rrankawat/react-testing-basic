import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './usersSlice'
import Users from './Users'

// Helper for isolated store
const setupStore = preloadedState =>
  configureStore({ reducer: { users: userReducer } }, preloadedState)

const store = setupStore()

beforeEach(() => {
  global.fetch = jest.fn()
})

afterEach(() => {
  jest.resetAllMocks()
})

const mockUsers = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Kein Adoms' },
]

test('Render users after successful fetch', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: jest.fn().mockResolvedValueOnce(mockUsers),
  })

  render(
    <Provider store={store}>
      <Users />
    </Provider>
  )

  expect(screen.getByText(/loading/i)).toBeInTheDocument()
  expect(await screen.findByText('John Doe')).toBeInTheDocument()
  expect(await screen.findByText('Kein Adoms')).toBeInTheDocument()
})

test('Render error when fetch fails', async () => {
  fetch.mockResolvedValueOnce({
    ok: false,
  })

  render(
    <Provider store={store}>
      <Users />
    </Provider>
  )

  expect(screen.getByText(/loading/i)).toBeInTheDocument()
  expect(await screen.findByRole('alert')).toHaveTextContent(
    /failed to fetch users/i
  )
})

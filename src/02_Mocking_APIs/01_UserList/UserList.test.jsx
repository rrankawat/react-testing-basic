import { render, screen } from '@testing-library/react'
import UserList from './UserList'

// Let mock API response
const mockUsers = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
]

beforeEach(() => {
  // Mock the global fetch function
  global.fetch = jest.fn()
})

afterEach(() => {
  // Reset mocks after each test
  jest.resetAllMocks()
})

test('Render users after fetch', async () => {
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(mockUsers),
  })

  // Act: render component
  render(<UserList />)

  // Assert: Ensure fetch was called exactly once
  expect(fetch).toHaveBeenCalledTimes(1)
  expect(fetch).toHaveBeenCalledWith(
    'https://jsonplaceholder.typicode.com/users'
  )

  // Assert: Loading appears first
  expect(screen.getByText(/loading/i)).toBeInTheDocument()

  // Assert: Wait for list items to appear
  for (const user of mockUsers) {
    const listItem = await screen.findByText(user.name)
    expect(listItem).toBeInTheDocument()
  }
})

test('Renders error message on fetch failure', async () => {
  fetch.mockRejectedValueOnce(new Error('Failed to fetch'))

  render(<UserList />)

  // Confirm fetch called once
  expect(fetch).toHaveBeenCalledTimes(1)

  expect(screen.getByText(/loading/i)).toBeInTheDocument()

  const errorMsg = await screen.findByRole('alert')
  expect(errorMsg).toHaveTextContent('Failed to load users')
})

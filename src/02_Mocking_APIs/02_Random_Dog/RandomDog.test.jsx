import { render, screen } from '@testing-library/react'
import RandomDog from './RandomDog'

// Mock API response
const mockDog = {
  message: 'https://images.dog.ceo/breeds/danish-swedish-farmdog/ebba_003.jpg',
  status: 'success',
}

beforeEach(() => {
  // Mock global fetch function
  global.fetch = jest.fn()
})

afterEach(() => {
  // Reset mock after each test
  jest.resetAllMocks()
})

test('Render data after fetch', async () => {
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(mockDog),
  })

  render(<RandomDog />)

  expect(fetch).toHaveBeenCalledTimes(1)
  expect(fetch).toHaveBeenCalledWith('https://dog.ceo/api/breeds/image/random')

  expect(screen.getByText(/loading/i)).toBeInTheDocument()

  const img = await screen.findByRole('img')
  expect(img).toHaveAttribute('src', mockDog.message)
  expect(img).toHaveAttribute('alt', 'Random Dog')
})

test('Render error msg on fetch failure', async () => {
  fetch.mockRejectedValueOnce(new Error('Failed to fetch'))

  render(<RandomDog />)

  expect(fetch).toHaveBeenCalledTimes(1)

  expect(screen.getByText(/loading/i)).toBeInTheDocument()

  const errorMsg = await screen.findByRole('alert')
  expect(errorMsg).toHaveTextContent('Failed to load data')
})

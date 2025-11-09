import { render, screen } from '@testing-library/react'
import Login from './Login'

test('Render component on screen', () => {
  render(<Login />)

  const h1 = screen.getByText(/login page/i)
  expect(h1).toBeInTheDocument()
})

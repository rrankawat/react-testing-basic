import { render, screen } from '@testing-library/react'
import Home from './Home'

test('Render component on screen', () => {
  render(<Home />)

  const h1 = screen.getByText(/home page/i)
  expect(h1).toBeInTheDocument()
})

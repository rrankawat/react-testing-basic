import { render, screen } from '@testing-library/react'
import Profile from './Profile'

test('Render component on screen', () => {
  render(<Profile />)

  const h1 = screen.getByText(/your profile/i)
  expect(h1).toBeInTheDocument()
})

import { render, screen } from '@testing-library/react'
import Greeting from './Greeting'

test('Render default greeting', () => {
  render(<Greeting />)
  const text = screen.getByText(/hello, guest/i)
  expect(text).toBeInTheDocument()
})

test('Render personalized greeting', () => {
  render(<Greeting name='John' />)
  const text = screen.getByText(/hello, John/i)
  expect(text).toBeInTheDocument()
})

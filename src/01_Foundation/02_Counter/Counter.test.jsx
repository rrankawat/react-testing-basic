import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from './Counter'

test('Render counter when clicked', async () => {
  render(<Counter />)

  const btn = screen.getByRole('button', { name: /increment/i })
  await userEvent.click(btn)
  expect(screen.getByText(/count: 1/i)).toBeInTheDocument()
})

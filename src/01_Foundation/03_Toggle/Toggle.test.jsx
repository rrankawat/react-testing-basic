import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Toggle from './Toggle'

test('Render text when toggle clicked', async () => {
  render(<Toggle />)

  const btn = screen.getByRole('button', { name: /show|hide/i })

  await userEvent.click(btn)
  expect(screen.getByText(/Hello World!/i)).toBeInTheDocument()

  await userEvent.click(btn)
  expect(screen.queryByText(/Hello World!/i)).not.toBeInTheDocument()
})

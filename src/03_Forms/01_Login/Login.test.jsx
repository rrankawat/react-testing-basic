import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from './Login'

test('Show error if fields are empty', async () => {
  render(<Login onSubmit={jest.fn()} />)

  await userEvent.click(screen.getByRole('button', { name: /login/i }))
  expect(await screen.findByRole('alert')).toHaveTextContent(
    /all fields are required/i
  )
})

test('Submit form data correctly', async () => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)

  await userEvent.type(screen.getByLabelText(/email/i), 'john@gmail.com')
  await userEvent.type(screen.getByLabelText(/password/i), 'password')
  await userEvent.click(screen.getByRole('button', { name: /login/i }))

  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'john@gmail.com',
    password: 'password',
  })
})

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

  const email = screen.getByLabelText(/email/i)
  const password = screen.getByLabelText(/password/i)
  const button = screen.getByRole('button', { name: /login/i })

  await userEvent.type(email, 'john@gmail.com')
  await userEvent.type(password, 'password')
  await userEvent.click(button)

  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'john@gmail.com',
    password: 'password',
  })
  expect(email).toHaveValue('')
  expect(password).toHaveValue('')
})

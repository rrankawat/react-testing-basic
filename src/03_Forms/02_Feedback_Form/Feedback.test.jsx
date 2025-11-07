import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Feedback from './Feedback'

test('Show error if fields are empty', async () => {
  render(<Feedback onSubmit={jest.fn()} />)

  await userEvent.click(
    screen.getByRole('button', { name: /submit feedback/i })
  )
  expect(await screen.findByRole('alert')).toHaveTextContent(
    /all fields are required/i
  )
})

test('Submit form data correctly', async () => {
  const handleSubmit = jest.fn()
  render(<Feedback onSubmit={handleSubmit} />)

  await userEvent.type(screen.getByLabelText(/name/i), 'John Doe')
  await userEvent.type(
    screen.getByLabelText(/feedback/i),
    'Hi, It was a great service!'
  )
  await userEvent.selectOptions(screen.getByLabelText(/rating/i), '5')
  await userEvent.click(
    screen.getByRole('button', { name: /submit feedback/i })
  )

  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith({
    name: 'John Doe',
    feedback: 'Hi, It was a great service!',
    rating: '5',
  })
})

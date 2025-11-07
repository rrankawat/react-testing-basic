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

  const name = screen.getByLabelText(/name/i)
  const feedback = screen.getByLabelText(/feedback/i)
  const rating = screen.getByLabelText(/rating/i)

  await userEvent.type(name, 'John Doe')
  await userEvent.type(feedback, 'Hi, It was a great service!')
  await userEvent.selectOptions(rating, '5')
  await userEvent.click(
    screen.getByRole('button', { name: /submit feedback/i })
  )

  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith({
    name: 'John Doe',
    feedback: 'Hi, It was a great service!',
    rating: '5',
  })
  expect(name).toHaveValue('')
  expect(feedback).toHaveValue('')
  expect(rating).toHaveValue('')
})

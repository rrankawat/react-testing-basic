import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../store'
import Counter from './Counter'

const renderWithProvider = (ui, { store }) => {
  return render(<Provider store={store}>{ui}</Provider>)
}

test('Counter updates on button clicks', async () => {
  renderWithProvider(<Counter />, { store })

  const countElement = screen.getByTestId('count')
  expect(countElement).toHaveTextContent('0')

  await userEvent.click(screen.getByText('+'))
  expect(countElement).toHaveTextContent('1')

  await userEvent.click(screen.getByText('-'))
  expect(countElement).toHaveTextContent('0')

  await userEvent.click(screen.getByText('+'))
  expect(countElement).toHaveTextContent('1')

  await userEvent.click(screen.getByText(/reset/i))
  expect(countElement).toHaveTextContent('0')
})

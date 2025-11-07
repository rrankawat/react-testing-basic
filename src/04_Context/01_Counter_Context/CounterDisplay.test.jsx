import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CounterProvider } from './CounterContext'
import CounterDisplay from './CounterDisplay'

// Helper function to render with context
const renderWithContext = ui => {
  return render(<CounterProvider>{ui}</CounterProvider>)
}

test('Render initial count and updates when buttons clicked', async () => {
  renderWithContext(<CounterDisplay />)

  const countElement = screen.getByTestId('count')
  expect(countElement).toHaveTextContent(/count: 0/i)

  await userEvent.click(screen.getByText('+'))
  expect(countElement).toHaveTextContent(/count: 1/i)

  await userEvent.click(screen.getByText('-'))
  expect(countElement).toHaveTextContent(/count: 0/i)
})

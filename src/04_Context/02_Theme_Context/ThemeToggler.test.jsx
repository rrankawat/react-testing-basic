import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThemeToggler from './ThemeToggler'
import { ThemeProvider } from './ThemeContext'

// Helper function to render with context
const renderWithContext = ui => {
  return render(<ThemeProvider>{ui}</ThemeProvider>)
}

test('Render initial theme and update on button click', async () => {
  renderWithContext(<ThemeToggler />)

  const themeElement = screen.getByTestId('theme')
  expect(themeElement).toHaveClass('light')

  await userEvent.click(screen.getByText(/change theme/i))
  expect(themeElement).toHaveClass('dark')

  await userEvent.click(screen.getByText(/change theme/i))
  expect(themeElement).toHaveClass('light')
})

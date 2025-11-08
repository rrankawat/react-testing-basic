import { useTheme } from './ThemeContext'

const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div data-testid='theme' className={theme === 'light' ? 'light' : 'dark'}>
      <button onClick={toggleTheme}>Change Theme</button>
    </div>
  )
}

export default ThemeToggler

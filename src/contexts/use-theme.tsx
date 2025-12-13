import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Context,
  type ReactNode,
} from 'react'
import { Logger } from '../utils/logger'

const logger = new Logger('./src/contexts/use-theme.tsx')

export type Theme = 'light' | 'dark' | 'system'

interface ThemeContextProps {
  theme: Theme
  fullTheme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext: Context<ThemeContextProps | undefined> = createContext<
  ThemeContextProps | undefined
>(undefined)

interface ThemeContextProviderProps {
  children: React.ReactNode
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}): ReactNode => {
  const [systemThemeIsDark, setSystemThemeIsDark] = useState<boolean>(
    window.matchMedia
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false,
  )
  const [theme, setCurrentTheme] = useState<Theme>(
    (localStorage.getItem('theme') as Theme) || 'system',
  )

  const setTheme = (newTheme: Theme): void => {
    logger.debug(`Setting theme to ${newTheme}`)
    setCurrentTheme(newTheme)
    localStorage.setItem('theme', newTheme)

    const currentSystemThemeIsDark = window.matchMedia
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false

    const isDarkMode =
      newTheme === 'dark' || (newTheme === 'system' && currentSystemThemeIsDark)

    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const value: ThemeContextProps = {
    theme,
    fullTheme:
      theme === 'system' ? (systemThemeIsDark ? 'dark' : 'light') : theme,
    setTheme,
  }

  useEffect(() => {
    if (window.matchMedia) {
      setTheme(theme)
      const handleSystemThemeChange = (event: MediaQueryListEvent) => {
        logger.debug(
          `System theme changed to ${event.matches ? 'dark' : 'light'}`,
        )
        setSystemThemeIsDark(event.matches)
        if (event.matches) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', handleSystemThemeChange)

      return () => {
        mediaQuery.removeEventListener('change', handleSystemThemeChange)
      }
    }
  }, [])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextProps => {
  const context: ThemeContextProps | undefined = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeContextProvider')
  }
  return context
}

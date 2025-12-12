import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { authActions, authSelector } from '../slices/auth-slice'
import { useTheme } from '../contexts/use-theme.tsx'

export const HomePage: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { theme, fullTheme, setTheme } = useTheme()

  const authState = authSelector('state')
  const authError = authSelector('error')
  const isLoggingOut = authState === 'logout-requested'
  const hasError = authState === 'logout-error' || authError !== null

  const onLogoutClicked = async () => {
    dispatch(authActions.logoutRequested())
  }

  return (
    <div>
      <h1>{t('helloWorld', { postProcess: 'capitalize' })}</h1>
      {hasError && <p>{authError!.message}</p>}
      <button
        className={`bg-blue-500 text-white p-2 rounded-md ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={onLogoutClicked}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? 'Logging out...' : 'Logout'}
      </button>
      <p>Current theme: {theme}</p>
      <p>Full theme: {fullTheme}</p>
      <button
        className="bg-blue-500 text-white p-2 rounded-md dark:bg-gray-800"
        onClick={() => setTheme('light')}
      >
        Set Light Theme
      </button>
      <button
        className="bg-blue-500 text-white p-2 rounded-md dark:bg-gray-800"
        onClick={() => setTheme('dark')}
      >
        Set Dark Theme
      </button>
      <button
        className="bg-blue-500 text-white p-2 rounded-md dark:bg-gray-800"
        onClick={() => setTheme('system')}
      >
        Set System Theme
      </button>
    </div>
  )
}

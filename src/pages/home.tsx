import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { authActions, authSelector } from '../slices/auth-slice'
import { useTheme } from '../contexts/use-theme.tsx'
import { Layout } from '../components/stateless/layout.tsx'

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
    <Layout>
      <Layout.Header className="bg-blue-500 dark:bg-gray-800 dark:text-white">
        <h1>{t('helloWorld', { postProcess: 'capitalize' })}</h1>
      </Layout.Header>
      <Layout.Content className="p-4 dark:bg-gray-800 dark:text-white">
        {hasError && <p>{authError!.message}</p>}
        <button
          className={`bg-blue-500 hover:bg-blue-600 text-white
         dark:bg-gray-600 dark:hover:bg-gray-700
         px-4 py-2 rounded ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={onLogoutClicked}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
        <p>Current theme: {theme}</p>
        <p>Full theme: {fullTheme}</p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-gray-600 dark:hover:bg-gray-700 px-4 py-2 rounded"
          onClick={() => setTheme('light')}
        >
          Set Light Theme
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-gray-600 dark:hover:bg-gray-700 px-4 py-2 rounded"
          onClick={() => setTheme('dark')}
        >
          Set Dark Theme
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-gray-600 dark:hover:bg-gray-700 px-4 py-2 rounded"
          onClick={() => setTheme('system')}
        >
          Set System Theme
        </button>
      </Layout.Content>
      <Layout.Footer className="bg-blue-500 dark:bg-gray-800 dark:text-white">
        <h1>Footer</h1>
      </Layout.Footer>
    </Layout>
  )
}

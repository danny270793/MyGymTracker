import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { authActions, authSelector } from '../slices/auth-slice'
import { Layout } from '../components/stateless/layout'

export const LoginPage: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const authState = authSelector('state')
  const authError = authSelector('error')
  const isLoggingIn = authState === 'login-requested'
  const hasError = authState === 'login-error' || authError !== null

  const onLoginClicked = async () => {
    dispatch(authActions.loginRequested())
  }

  return (
    <Layout>
      <Layout.Header className="bg-blue-500 dark:bg-gray-800 dark:text-white">
        <h1>{t('login', { postProcess: 'capitalize' })}</h1>
      </Layout.Header>
      <Layout.Content className="p-4 dark:bg-gray-800 dark:text-white">
        {hasError && <p>{authError!.message}</p>}
        <button
          className={`bg-blue-500 hover:bg-blue-600 text-white dark:bg-gray-600 dark:hover:bg-gray-700 px-4 py-2 rounded ${isLoggingIn ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={onLoginClicked}
          disabled={isLoggingIn}
        >
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </button>
      </Layout.Content>
      <Layout.Footer className="bg-blue-500 dark:bg-gray-800 dark:text-white">
        <h1>Footer</h1>
      </Layout.Footer>
    </Layout>
  )
}

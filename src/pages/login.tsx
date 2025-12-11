import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { authActions, authSelector } from '../slices/auth-slice'

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
    <div>
      <h1>{t('login', { postProcess: 'capitalize' })}</h1>
      {hasError && <p>{authError!.message}</p>}
      <button
        className={`bg-blue-500 text-white p-2 rounded-md ${isLoggingIn ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={onLoginClicked}
        disabled={isLoggingIn}
      >
        {isLoggingIn ? 'Logging in...' : 'Login'}
      </button>
    </div>
  )
}

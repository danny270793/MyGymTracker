import { useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { authActions } from '../slices/auth-slice'

export const HomePage: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const onLogoutClicked = async () => {
    setIsLoggingOut(true)
    dispatch(authActions.logoutRequested())
    await new Promise(resolve => setTimeout(resolve, 3000))
    dispatch(authActions.logoutSuccess())
    setIsLoggingOut(false)
  }

  return (
    <div>
      <h1>{t('helloWorld', { postProcess: 'capitalize' })}</h1>
      <button className={`bg-blue-500 text-white p-2 rounded-md ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={onLogoutClicked} disabled={isLoggingOut}>{isLoggingOut ? 'Logging out...' : 'Logout'}</button>
    </div>
  )
}

import type { ReactNode } from 'react'
import { useNavigate, type NavigateFunction } from 'react-router-dom'
import { LoginPage } from '../pages/login'
import { HomePage } from '../pages/home'
import { RegisterPage } from '../pages/register'

export type Route = {
  component: ReactNode
  path: string
  name: string
  authenticated: boolean
}

export const routes: Route[] = [
  {
    component: <LoginPage />,
    path: '/login',
    name: 'Login',
    authenticated: false,
  },
  {
    component: <RegisterPage />,
    path: '/register',
    name: 'Register',
    authenticated: false,
  },
  {
    component: <HomePage />,
    path: '/',
    name: 'Home',
    authenticated: true,
  },
]

export interface Router {
  goToHome: () => void
  goToLogin: () => void
  goToRegister: () => void
  goToError: () => void
  goToNotFound: () => void
  goTo: (path: string) => void
}

export const useRouter = (): Router => {
  const navigate: NavigateFunction = useNavigate()

  return {
    goToHome: () => {
      navigate('/')
    },
    goToLogin: () => {
      navigate('/login')
    },
    goToRegister: () => {
      navigate('/register')
    },
    goToError: () => {
      navigate('/error')
    },
    goToNotFound: () => {
      navigate('*')
    },
    goTo: (path: string) => {
      navigate(path)
    },
  }
}

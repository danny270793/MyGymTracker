import type { ReactNode } from "react"
import { useNavigate, type NavigateFunction } from "react-router-dom"
import { LoginPage } from "../pages/login"
import { HomePage } from "../pages/home"

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
      component: <HomePage />,
      path: '/',
      name: 'Home',
      authenticated: true,
    },
]

export interface Router {
    goToHome: () => void
    goToLogin: () => void
    goToError: () => void
    goToNotFound: () => void
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
        goToError: () => {
            navigate('/error')
        },
        goToNotFound: () => {
            navigate('*')
        }
    }
}

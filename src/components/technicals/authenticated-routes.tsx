import { useEffect, type FC } from 'react'
import { Outlet } from 'react-router-dom'
import { useRouter, type Router } from '../../hooks/use-router'
import { authSelector } from '../../slices/auth-slice'

export const AuthenticatedRoutes: FC = () => {
  const router: Router = useRouter()
  const accessToken: string | null = authSelector('accessToken')

  useEffect(() => {
    if (!accessToken) {
      router.goToLogin()
    }
  }, [accessToken])

  return <Outlet />
}

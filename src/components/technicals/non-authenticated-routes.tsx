import { useEffect, type FC } from 'react'
import { Outlet } from 'react-router-dom'
import { useRouter, type Router } from '../../hooks/use-router'
import { useSelector } from 'react-redux'
import type { RootState } from '../../slices/index'

export const NonAuthenticatedRoutes: FC = () => {
  const router: Router = useRouter()
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)

  useEffect(() => {
    if (accessToken) {
      router.goToHome()
    }
  }, [accessToken])

  return <Outlet />
}

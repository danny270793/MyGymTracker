import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useRouter } from '../../hooks/use-router'

export default function NavigatorListener() {
  const { pathname } = useLocation()
  const router = useRouter();

  useEffect(() => {
    if(pathname === '/error') {
      router.goToError();
    }
  }, [pathname])

  return null
}

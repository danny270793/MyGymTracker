import { useEffect } from 'react'
import { useRouter } from '../../hooks/use-router'
import { navigatorSelector } from '../../slices/navigator-slice'

export default function SagasNavigatorListener() {
  const path = navigatorSelector('path')
  const router = useRouter()

  useEffect(() => {
    if (path) {
      router.goTo(path)
    }
  }, [path])

  return null
}

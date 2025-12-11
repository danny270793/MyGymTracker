import { useEffect, type FC } from "react"
import { Outlet } from "react-router-dom"
import { useRouter, type Router } from "../../hooks/use-router"

export const NonAuthenticatedRoutes: FC = () => {
    const router: Router = useRouter()

    useEffect(() => {
        const token: string | null = localStorage.getItem('token')
        if (token) {
            router.goToHome()
        }
    }, [])

    return <Outlet />
}

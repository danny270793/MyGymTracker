import { useEffect, type FC } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export const AuthenticatedRoutes: FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const token: string | null = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
        }
    }, [])

    return <Outlet />
}

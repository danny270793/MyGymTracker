import type { FC } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { NotFoundPage } from "./pages/not-found-page"
import { ErrorPage } from "./pages/error-page"
import { AuthenticatedRoutes } from "./components/technicals/authenticated-routes"
import { NonAuthenticatedRoutes } from "./components/technicals/non-authenticated-routes"
import { routes } from "./hooks/use-router"

export const  App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthenticatedRoutes />}>
          {routes.filter((route) => route.authenticated).map((route) => (
            <Route key={route.name} path={route.path} element={route.component} />
          ))}
        </Route>
        <Route path="/" element={<NonAuthenticatedRoutes />}>
          {routes.filter((route) => !route.authenticated).map((route) => (
            <Route key={route.name} path={route.path} element={route.component} />
          ))}
        </Route>
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

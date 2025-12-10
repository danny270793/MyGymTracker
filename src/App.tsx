import type { FC } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HomePage } from "./pages/home"
import { LoginPage } from "./pages/login"
import { NotFoundPage } from "./pages/not-found-page"
import { ErrorPage } from "./pages/error-page"
import { AuthenticatedRoutes } from "./components/technicals/authenticated-routes"
import { NonAuthenticatedRoutes } from "./components/technicals/non-authenticated-routes"

export const  App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthenticatedRoutes />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/" element={<NonAuthenticatedRoutes />}>
        <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

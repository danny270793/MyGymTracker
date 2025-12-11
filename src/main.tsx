import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './i18n'
import { ErrorBoundary } from './components/technicals/error-boundary.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthenticatedRoutes } from './components/technicals/authenticated-routes.tsx'
import { NonAuthenticatedRoutes } from './components/technicals/non-authenticated-routes.tsx'
import { routes } from './hooks/use-router.tsx'
import { ErrorPage } from './pages/error-page.tsx'
import { NotFoundPage } from './pages/not-found-page.tsx'
import ScrollToTop from './components/technicals/scroll-to-top.tsx'
import { store } from './slices/index.ts'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<AuthenticatedRoutes />}>
              {routes
                .filter((route) => route.authenticated)
                .map((route) => (
                  <Route
                    key={route.name}
                    path={route.path}
                    element={route.component}
                  />
                ))}
            </Route>
            <Route path="/" element={<NonAuthenticatedRoutes />}>
              {routes
                .filter((route) => !route.authenticated)
                .map((route) => (
                  <Route
                    key={route.name}
                    path={route.path}
                    element={route.component}
                  />
                ))}
            </Route>
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
)

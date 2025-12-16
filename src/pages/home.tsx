import { type FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { authActions, authSelector } from '../slices/auth-slice'
import { musclesActions, musclesSelector } from '../slices/muscles-slice'
import { useTheme } from '../contexts/use-theme.tsx'
import { Layout } from '../components/stateless/layout.tsx'

type SidebarOption = 'muscles'

export const HomePage: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { theme, setTheme } = useTheme()

  const [selectedOption, setSelectedOption] = useState<SidebarOption>('muscles')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const authState = authSelector('state')
  const authError = authSelector('error')
  const isLoggingOut = authState === 'logout-requested'
  const hasAuthError = authState === 'logout-error' || authError !== null

  const muscles = musclesSelector('muscles')
  const musclesState = musclesSelector('state')
  const musclesError = musclesSelector('error')

  useEffect(() => {
    if (selectedOption === 'muscles' && musclesState === 'idle') {
      dispatch(musclesActions.fetchRequested())
    }
  }, [selectedOption, musclesState, dispatch])

  const onLogoutClicked = () => {
    dispatch(authActions.logoutRequested())
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const renderContent = () => {
    switch (selectedOption) {
      case 'muscles':
        return (
          <div className="space-y-3">
            {musclesState === 'loading' && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
                <span className="ml-3 text-slate-600 dark:text-slate-400">
                  {t('loading', { postProcess: 'capitalize' })}
                </span>
              </div>
            )}
            {musclesState === 'error' && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                <p className="text-red-600 dark:text-red-400">
                  {t('errorLoadingData', { postProcess: 'capitalize' })}:{' '}
                  {musclesError?.message}
                </p>
              </div>
            )}
            {musclesState === 'success' && muscles.length === 0 && (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                {t('noDataFound', { postProcess: 'capitalize' })}
              </div>
            )}
            {musclesState === 'success' &&
              muscles.map((muscle) => (
                <div
                  key={muscle.id}
                  className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                      {muscle.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-slate-800 dark:text-white">
                        {muscle.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Layout>
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-slate-900 dark:bg-slate-950 transform transition-transform duration-300 ease-in-out z-50
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-slate-800">
            <h2 className="text-xl font-bold text-white">
              🏋️ GymTracker
            </h2>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => {
                setSelectedOption('muscles')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all
                ${
                  selectedOption === 'muscles'
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
            >
              <span className="text-xl mr-3">💪</span>
              <span className="font-medium">
                {t('muscles', { postProcess: 'capitalize' })}
              </span>
            </button>
          </nav>

          {/* Sidebar Footer - Theme & Logout */}
          <div className="p-4 border-t border-slate-800 space-y-2">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-slate-400 text-sm">Theme</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setTheme('light')}
                  className={`p-2 rounded-lg transition-all ${
                    theme === 'light'
                      ? 'bg-yellow-500 text-white'
                      : 'text-slate-400 hover:bg-slate-800'
                  }`}
                  title="Light"
                >
                  ☀️
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-2 rounded-lg transition-all ${
                    theme === 'dark'
                      ? 'bg-indigo-500 text-white'
                      : 'text-slate-400 hover:bg-slate-800'
                  }`}
                  title="Dark"
                >
                  🌙
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={`p-2 rounded-lg transition-all ${
                    theme === 'system'
                      ? 'bg-slate-600 text-white'
                      : 'text-slate-400 hover:bg-slate-800'
                  }`}
                  title="System"
                >
                  💻
                </button>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogoutClicked}
              disabled={isLoggingOut}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all
                text-red-400 hover:bg-red-500/10 hover:text-red-300
                ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="text-xl mr-3">🚪</span>
              <span className="font-medium">
                {isLoggingOut
                  ? t('loggingOut', { postProcess: 'capitalize' })
                  : t('logout', { postProcess: 'capitalize' })}
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        <Layout.Header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 mr-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h1 className="text-xl font-bold text-slate-800 dark:text-white">
                {t(selectedOption, { postProcess: 'capitalize' })}
              </h1>
            </div>
          </div>
        </Layout.Header>

        <Layout.Content className="p-4 bg-slate-50 dark:bg-slate-900">
          {hasAuthError && (
            <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
              <p className="text-red-600 dark:text-red-400">
                {authError?.message}
              </p>
            </div>
          )}
          {renderContent()}
        </Layout.Content>
      </div>
    </Layout>
  )
}

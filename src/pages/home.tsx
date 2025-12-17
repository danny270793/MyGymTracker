import { type FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { authActions, authSelector } from '../slices/auth-slice'
import { musclesActions, musclesSelector } from '../slices/muscles-slice'
import { useTheme } from '../contexts/use-theme.tsx'
import { Layout } from '../components/stateless/layout.tsx'
import type { Muscle } from '../services/backend'

type SidebarOption = 'muscles'

export const HomePage: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { theme, setTheme } = useTheme()

  const [selectedOption, setSelectedOption] = useState<SidebarOption>('muscles')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingMuscle, setEditingMuscle] = useState<Muscle | null>(null)

  const authState = authSelector('state')
  const authError = authSelector('error')
  const isLoggingOut = authState === 'logout-requested'
  const hasAuthError = authState === 'logout-error' || authError !== null

  const muscles = musclesSelector('muscles')
  const musclesState = musclesSelector('state')
  const musclesError = musclesSelector('error')
  const createState = musclesSelector('createState')
  const updateState = musclesSelector('updateState')

  const muscleSchema = Yup.object().shape({
    name: Yup.string().required(t('muscleNameRequired')),
  })

  const createFormik = useFormik({
    initialValues: { name: '' },
    validationSchema: muscleSchema,
    onSubmit: (values) => {
      dispatch(musclesActions.createRequested({ name: values.name }))
    },
  })

  const editFormik = useFormik({
    initialValues: { name: '' },
    validationSchema: muscleSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (editingMuscle) {
        dispatch(
          musclesActions.updateRequested({ id: editingMuscle.id, name: values.name }),
        )
      }
    },
  })

  useEffect(() => {
    if (selectedOption === 'muscles' && musclesState === 'idle') {
      dispatch(musclesActions.fetchRequested())
    }
  }, [selectedOption, musclesState, dispatch])

  useEffect(() => {
    if (createState === 'success') {
      setIsCreateModalOpen(false)
      createFormik.resetForm()
      dispatch(musclesActions.resetCreateState())
    }
  }, [createState, dispatch, createFormik])

  useEffect(() => {
    if (updateState === 'success') {
      setIsEditModalOpen(false)
      setEditingMuscle(null)
      editFormik.resetForm()
      dispatch(musclesActions.resetUpdateState())
    }
  }, [updateState, dispatch, editFormik])

  const onLogoutClicked = () => {
    dispatch(authActions.logoutRequested())
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const openCreateModal = () => {
    setIsCreateModalOpen(true)
    dispatch(musclesActions.resetCreateState())
  }

  const closeCreateModal = () => {
    setIsCreateModalOpen(false)
    createFormik.resetForm()
    dispatch(musclesActions.resetCreateState())
  }

  const openEditModal = (muscle: Muscle) => {
    setEditingMuscle(muscle)
    editFormik.setFieldValue('name', muscle.name)
    setIsEditModalOpen(true)
    dispatch(musclesActions.resetUpdateState())
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setEditingMuscle(null)
    editFormik.resetForm()
    dispatch(musclesActions.resetUpdateState())
  }

  const renderCreateModal = () => {
    if (!isCreateModalOpen) return null

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-200">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              {t('createMuscle', { postProcess: 'capitalize' })}
            </h2>
          </div>

          <form onSubmit={createFormik.handleSubmit} className="p-6 space-y-4">
            <div>
              <label
                htmlFor="create-name"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                {t('muscleName', { postProcess: 'capitalize' })}
              </label>
              <input
                id="create-name"
                name="name"
                type="text"
                placeholder={t('muscleNamePlaceholder')}
                value={createFormik.values.name}
                onChange={createFormik.handleChange}
                onBlur={createFormik.handleBlur}
                disabled={createState === 'creating'}
                className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 text-slate-800 dark:text-white placeholder-slate-400
                  focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all
                  ${
                    createFormik.touched.name && createFormik.errors.name
                      ? 'border-red-500'
                      : 'border-slate-200 dark:border-slate-700'
                  }
                  ${createState === 'creating' ? 'opacity-50' : ''}`}
              />
              {createFormik.touched.name && createFormik.errors.name && (
                <p className="mt-2 text-sm text-red-500">{createFormik.errors.name}</p>
              )}
            </div>

            {createState === 'error' && musclesError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {musclesError.message}
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={closeCreateModal}
                disabled={createState === 'creating'}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium
                  hover:bg-slate-50 dark:hover:bg-slate-700 transition-all
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('cancel', { postProcess: 'capitalize' })}
              </button>
              <button
                type="submit"
                disabled={createState === 'creating'}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium
                  hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/30
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createState === 'creating'
                  ? t('creating', { postProcess: 'capitalize' })
                  : t('create', { postProcess: 'capitalize' })}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  const renderEditModal = () => {
    if (!isEditModalOpen || !editingMuscle) return null

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-200">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              {t('editMuscle', { postProcess: 'capitalize' })}
            </h2>
          </div>

          <form onSubmit={editFormik.handleSubmit} className="p-6 space-y-4">
            <div>
              <label
                htmlFor="edit-name"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                {t('muscleName', { postProcess: 'capitalize' })}
              </label>
              <input
                id="edit-name"
                name="name"
                type="text"
                placeholder={t('muscleNamePlaceholder')}
                value={editFormik.values.name}
                onChange={editFormik.handleChange}
                onBlur={editFormik.handleBlur}
                disabled={updateState === 'updating'}
                className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 text-slate-800 dark:text-white placeholder-slate-400
                  focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all
                  ${
                    editFormik.touched.name && editFormik.errors.name
                      ? 'border-red-500'
                      : 'border-slate-200 dark:border-slate-700'
                  }
                  ${updateState === 'updating' ? 'opacity-50' : ''}`}
              />
              {editFormik.touched.name && editFormik.errors.name && (
                <p className="mt-2 text-sm text-red-500">{editFormik.errors.name}</p>
              )}
            </div>

            {updateState === 'error' && musclesError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {musclesError.message}
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={closeEditModal}
                disabled={updateState === 'updating'}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium
                  hover:bg-slate-50 dark:hover:bg-slate-700 transition-all
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('cancel', { postProcess: 'capitalize' })}
              </button>
              <button
                type="submit"
                disabled={updateState === 'updating'}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium
                  hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/30
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updateState === 'updating'
                  ? t('updating', { postProcess: 'capitalize' })
                  : t('save', { postProcess: 'capitalize' })}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
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
                  onClick={() => openEditModal(muscle)}
                  className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                      {muscle.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3 flex-1">
                      <h3 className="font-semibold text-slate-800 dark:text-white">
                        {muscle.name}
                      </h3>
                    </div>
                    <div className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
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

        {/* Floating Action Button */}
        {selectedOption === 'muscles' && (
          <button
            onClick={openCreateModal}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/40
              hover:from-emerald-600 hover:to-teal-600 hover:shadow-xl hover:shadow-emerald-500/50 transition-all
              flex items-center justify-center text-2xl"
            title={t('createMuscle', { postProcess: 'capitalize' })}
          >
            +
          </button>
        )}
      </div>

      {/* Create Muscle Modal */}
      {renderCreateModal()}

      {/* Edit Muscle Modal */}
      {renderEditModal()}
    </Layout>
  )
}

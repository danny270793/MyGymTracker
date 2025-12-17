import { type FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { musclesActions, musclesSelector } from '../slices/muscles-slice'
import { Layout } from '../components/stateless/layout.tsx'
import { useRouter } from '../hooks/use-router'
import type { Muscle } from '../services/backend'

export const MuscleDetailPage: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = useParams<{ id: string }>()

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const muscles = musclesSelector('muscles')
  const musclesState = musclesSelector('state')
  const musclesError = musclesSelector('error')
  const updateState = musclesSelector('updateState')
  const deleteState = musclesSelector('deleteState')

  const muscle: Muscle | undefined = muscles.find((m) => m.id === Number(id))

  const muscleSchema = Yup.object().shape({
    name: Yup.string().required(t('muscleNameRequired')),
  })

  const editFormik = useFormik({
    initialValues: { name: muscle?.name || '' },
    validationSchema: muscleSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (muscle) {
        dispatch(musclesActions.updateRequested({ id: muscle.id, name: values.name }))
      }
    },
  })

  useEffect(() => {
    if (musclesState === 'idle') {
      dispatch(musclesActions.fetchRequested())
    }
  }, [musclesState, dispatch])

  useEffect(() => {
    if (updateState === 'success') {
      setIsEditModalOpen(false)
      dispatch(musclesActions.resetUpdateState())
    }
  }, [updateState, dispatch])

  useEffect(() => {
    if (deleteState === 'success') {
      setIsDeleteModalOpen(false)
      dispatch(musclesActions.resetDeleteState())
      router.goToHome()
    }
  }, [deleteState, dispatch, router])

  const openEditModal = () => {
    editFormik.setFieldValue('name', muscle?.name || '')
    setIsEditModalOpen(true)
    dispatch(musclesActions.resetUpdateState())
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    editFormik.resetForm()
    dispatch(musclesActions.resetUpdateState())
  }

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true)
    dispatch(musclesActions.resetDeleteState())
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    dispatch(musclesActions.resetDeleteState())
  }

  const handleDelete = () => {
    if (muscle) {
      dispatch(musclesActions.deleteRequested({ id: muscle.id }))
    }
  }

  const renderEditModal = () => {
    if (!isEditModalOpen || !muscle) return null

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

  const renderDeleteModal = () => {
    if (!isDeleteModalOpen || !muscle) return null

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-200">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              {t('deleteConfirmTitle', { postProcess: 'capitalize' })}
            </h2>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-slate-600 dark:text-slate-400">
              {t('deleteConfirmMessage', { postProcess: 'capitalize' })}
            </p>

            <div className="flex items-center p-4 bg-slate-100 dark:bg-slate-700 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                {muscle.name.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="font-semibold text-slate-800 dark:text-white">
                  {muscle.name}
                </p>
              </div>
            </div>

            {deleteState === 'error' && musclesError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {musclesError.message}
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={deleteState === 'deleting'}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium
                  hover:bg-slate-50 dark:hover:bg-slate-700 transition-all
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('cancel', { postProcess: 'capitalize' })}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteState === 'deleting'}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-medium
                  hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/30
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleteState === 'deleting'
                  ? t('deleting', { postProcess: 'capitalize' })
                  : t('delete', { postProcess: 'capitalize' })}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (musclesState === 'loading') {
    return (
      <Layout>
        <Layout.Content className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
            <span className="ml-3 text-slate-600 dark:text-slate-400">
              {t('loading', { postProcess: 'capitalize' })}
            </span>
          </div>
        </Layout.Content>
      </Layout>
    )
  }

  if (!muscle) {
    return (
      <Layout>
        <Layout.Content className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            {t('notFound', { postProcess: 'capitalize' })}
          </p>
          <button
            onClick={() => router.goToHome()}
            className="px-4 py-2 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-all"
          >
            {t('back', { postProcess: 'capitalize' })}
          </button>
        </Layout.Content>
      </Layout>
    )
  }

  return (
    <Layout>
      <Layout.Header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={() => router.goToHome()}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 mr-2"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">
              {muscle.name}
            </h1>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={openEditModal}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              title={t('editMuscle', { postProcess: 'capitalize' })}
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={openDeleteModal}
              className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              title={t('deleteMuscle', { postProcess: 'capitalize' })}
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </Layout.Header>

      <Layout.Content className="p-4 bg-slate-50 dark:bg-slate-900">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-2xl">
              {muscle.name.charAt(0).toUpperCase()}
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                {muscle.name}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                ID: {muscle.id}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
              {t('createdAt', { postProcess: 'capitalize' })}
            </h3>
            <p className="text-slate-800 dark:text-white">
              {new Date(muscle.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Layout.Content>

      {renderEditModal()}
      {renderDeleteModal()}
    </Layout>
  )
}


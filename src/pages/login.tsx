import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { authActions, authSelector } from '../slices/auth-slice'
import { useRouter } from '../hooks/use-router'
import type { Lang } from '../i18n/langs'

interface LoginFormValues {
  email: string
  password: string
}

export const LoginPage: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter()

  const authState = authSelector('state')
  const authError = authSelector('error')
  const isLoggingIn = authState === 'login-requested'
  const hasError = authState === 'login-error' || authError !== null

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t('emailInvalid'))
      .required(t('emailRequired')),
    password: Yup.string()
      .min(6, t('passwordMinLength'))
      .required(t('passwordRequired')),
  })

  const handleSubmit = (values: LoginFormValues) => {
    dispatch(
      authActions.loginRequested({
        email: values.email,
        password: values.password,
      }),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl mb-4 shadow-lg shadow-emerald-500/30">
            <span className="text-3xl">🏋️</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {t('loginWelcome', { postProcess: 'capitalize' })}
          </h1>
          <p className="text-slate-400">
            {t('loginSubtitle', { postProcess: 'capitalize' })}
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10">
          {hasError && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
              <p className="text-red-300 text-sm text-center">
                {t(authError?.message as keyof Lang, { postProcess: 'capitalize' })}
              </p>
            </div>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-6">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    {t('email', { postProcess: 'capitalize' })}
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder={t('emailPlaceholder')}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all
                      ${
                        errors.email && touched.email
                          ? 'border-red-500 focus:ring-red-500/50'
                          : 'border-white/10 focus:ring-emerald-500/50 focus:border-emerald-500'
                      }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="mt-2 text-sm text-red-400"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    {t('password', { postProcess: 'capitalize' })}
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    placeholder={t('passwordPlaceholder')}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all
                      ${
                        errors.password && touched.password
                          ? 'border-red-500 focus:ring-red-500/50'
                          : 'border-white/10 focus:ring-emerald-500/50 focus:border-emerald-500'
                      }`}
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="mt-2 text-sm text-red-400"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className={`w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all transform hover:scale-[1.02] active:scale-[0.98]
                    ${isLoggingIn ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoggingIn
                    ? t('loggingIn', { postProcess: 'capitalize' })
                    : t('loginButton', { postProcess: 'capitalize' })}
                </button>
              </Form>
            )}
          </Formik>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-slate-400">
              {t('noAccount')}{' '}
              <button
                type="button"
                onClick={() => router.goTo('/register')}
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                {t('createAccount', { postProcess: 'capitalize' })}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-8">
          {t('loginFooter', { postProcess: 'capitalize' })}
        </p>
      </div>
    </div>
  )
}

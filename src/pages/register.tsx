import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { authActions, authSelector } from '../slices/auth-slice'
import { useRouter } from '../hooks/use-router'
import type { Lang } from '../i18n/langs'

interface RegisterFormValues {
  email: string
  password: string
  confirmPassword: string
}

export const RegisterPage: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter()

  const authState = authSelector('state')
  const authError = authSelector('error')
  const isRegistering = authState === 'register-requested'
  const hasError = authState === 'register-error' || authError !== null
  const isSuccess = authState === 'register-success'

  const initialValues: RegisterFormValues = {
    email: '',
    password: '',
    confirmPassword: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t('emailInvalid'))
      .required(t('emailRequired')),
    password: Yup.string()
      .min(6, t('passwordMinLength'))
      .required(t('passwordRequired')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('passwordsMustMatch'))
      .required(t('confirmPasswordRequired')),
  })

  const handleSubmit = (values: RegisterFormValues) => {
    dispatch(
      authActions.registerRequested({
        email: values.email,
        password: values.password,
      }),
    )
  }

  // Success view
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center p-4">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 text-center">
            {/* Success Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mb-6 shadow-lg shadow-emerald-500/30">
              <span className="text-4xl">✉️</span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">
              {t('registerSuccessTitle', { postProcess: 'capitalize' })}
            </h2>

            <p className="text-slate-300 mb-4">
              {t('registerSuccessMessage')}
            </p>

            <p className="text-slate-400 text-sm mb-8">
              {t('registerSuccessHint')}
            </p>

            <button
              type="button"
              onClick={() => router.goToLogin()}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {t('goToLogin', { postProcess: 'capitalize' })}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl mb-4 shadow-lg shadow-teal-500/30">
            <span className="text-3xl">💪</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {t('registerWelcome', { postProcess: 'capitalize' })}
          </h1>
          <p className="text-slate-400">
            {t('registerSubtitle', { postProcess: 'capitalize' })}
          </p>
        </div>

        {/* Register Card */}
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
              <Form className="space-y-5">
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
                          : 'border-white/10 focus:ring-teal-500/50 focus:border-teal-500'
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
                          : 'border-white/10 focus:ring-teal-500/50 focus:border-teal-500'
                      }`}
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="mt-2 text-sm text-red-400"
                  />
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    {t('confirmPassword', { postProcess: 'capitalize' })}
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder={t('confirmPasswordPlaceholder')}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all
                      ${
                        errors.confirmPassword && touched.confirmPassword
                          ? 'border-red-500 focus:ring-red-500/50'
                          : 'border-white/10 focus:ring-teal-500/50 focus:border-teal-500'
                      }`}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="mt-2 text-sm text-red-400"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isRegistering}
                  className={`w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all transform hover:scale-[1.02] active:scale-[0.98]
                    ${isRegistering ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isRegistering
                    ? t('registering', { postProcess: 'capitalize' })
                    : t('registerButton', { postProcess: 'capitalize' })}
                </button>
              </Form>
            )}
          </Formik>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-slate-400">
              {t('alreadyHaveAccount')}{' '}
              <button
                type="button"
                onClick={() => router.goToLogin()}
                className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
              >
                {t('backToLogin', { postProcess: 'capitalize' })}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-8">
          {t('registerFooter', { postProcess: 'capitalize' })}
        </p>
      </div>
    </div>
  )
}


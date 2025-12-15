import { type FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field, type FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { authActions, authSelector } from '../slices/auth-slice'
import { useRouter } from '../hooks/use-router'

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

  const validationSchema = useMemo(
    () =>
      Yup.object({
        email: Yup.string()
          .email(t('emailInvalid'))
          .required(t('emailRequired')),
        password: Yup.string()
          .min(6, t('passwordMinLength'))
          .required(t('passwordRequired')),
      }),
    [t],
  )

  const handleSubmit = (
    values: LoginFormValues,
    _helpers: FormikHelpers<LoginFormValues>,
  ) => {
    dispatch(authActions.loginRequested(values))
  }

  // Translate error message if it's a known error key
  const getErrorMessage = (error: Error | null): string | null => {
    if (!error) return null
    // Check if the error message is a translation key
    const translated = t(error.message as 'invalidCredentials')
    return translated !== error.message ? translated : error.message
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-slate-900 to-zinc-900 dark:from-black dark:via-emerald-950 dark:to-slate-950">
        {/* Decorative shapes */}
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-lime-400/10 blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-teal-500/5 blur-2xl animate-pulse [animation-delay:2s]" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo / Brand */}
        <div className="mb-10 text-center animate-[fadeInDown_0.6s_ease-out]">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-emerald-400 to-lime-500 shadow-lg shadow-emerald-500/30">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-2">
            MyGymTracker
          </h1>
          <p className="text-emerald-300/80 text-lg font-medium tracking-wide">
            {t('loginSubtitle', { postProcess: 'capitalize' })}
          </p>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-sm animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              {t('loginWelcome', { postProcess: 'capitalize' })}
            </h2>

            {/* Server Error message */}
            {hasError && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 animate-[shake_0.5s_ease-in-out]">
                <p className="text-red-300 text-sm text-center font-medium">
                  {getErrorMessage(authError)}
                </p>
              </div>
            )}

            {/* Login Form */}
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
                      className="block text-sm font-medium text-emerald-300/90 mb-2"
                    >
                      {t('email', { postProcess: 'capitalize' })}
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={t('emailPlaceholder')}
                      disabled={isLoggingIn}
                      className={`
                        w-full px-4 py-3 rounded-xl
                        bg-white/5 border transition-all duration-200
                        text-white placeholder-slate-400/50
                        focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${
                          errors.email && touched.email
                            ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50'
                            : 'border-white/10 hover:border-white/20'
                        }
                      `}
                    />
                    {errors.email && touched.email && (
                      <p className="mt-2 text-sm text-red-400 font-medium">
                        {String(errors.email)}
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-emerald-300/90 mb-2"
                    >
                      {t('password', { postProcess: 'capitalize' })}
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder={t('passwordPlaceholder')}
                      disabled={isLoggingIn}
                      className={`
                        w-full px-4 py-3 rounded-xl
                        bg-white/5 border transition-all duration-200
                        text-white placeholder-slate-400/50
                        focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${
                          errors.password && touched.password
                            ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50'
                            : 'border-white/10 hover:border-white/20'
                        }
                      `}
                    />
                    {errors.password && touched.password && (
                      <p className="mt-2 text-sm text-red-400 font-medium">
                        {String(errors.password)}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
        <button
                    type="submit"
          disabled={isLoggingIn}
                    className={`
                      w-full py-4 px-6 rounded-xl font-bold text-lg tracking-wide
                      transition-all duration-300 ease-out mt-2
                      ${
                        isLoggingIn
                          ? 'bg-emerald-600/50 text-emerald-200 cursor-wait'
                          : 'bg-gradient-to-r from-emerald-500 to-lime-500 text-white hover:shadow-lg hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98]'
                      }
                    `}
                  >
                    {isLoggingIn ? (
                      <span className="flex items-center justify-center gap-3">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        {t('loggingIn', { postProcess: 'capitalize' })}
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        {t('loginButton', { postProcess: 'uppercase' })}
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </span>
                    )}
        </button>
                </Form>
              )}
            </Formik>

            {/* Create account link */}
            <p className="mt-6 text-center text-sm text-slate-400/80">
              {t('noAccount')}{' '}
              <button
                type="button"
                onClick={() => router.goToRegister()}
                className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
              >
                {t('createAccount', { postProcess: 'capitalize' })}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 py-6 text-center animate-[fadeIn_0.6s_ease-out_0.4s_both]">
        <p className="text-slate-400/60 text-sm font-medium tracking-wider uppercase">
          {t('loginFooter')}
        </p>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  )
}

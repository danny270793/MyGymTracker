import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { authActions, authSelector } from '../slices/auth-slice'

export const LoginPage: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const authState = authSelector('state')
  const authError = authSelector('error')
  const isLoggingIn = authState === 'login-requested'
  const hasError = authState === 'login-error' || authError !== null

  const onLoginClicked = async () => {
    dispatch(authActions.loginRequested())
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
        <div className="mb-12 text-center animate-[fadeInDown_0.6s_ease-out]">
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
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              {t('loginWelcome', { postProcess: 'capitalize' })}
            </h2>

            {/* Error message */}
            {hasError && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 animate-[shake_0.5s_ease-in-out]">
                <p className="text-red-300 text-sm text-center font-medium">
                  {authError?.message}
                </p>
              </div>
            )}

            {/* Login Button */}
            <button
              className={`
                w-full py-4 px-6 rounded-xl font-bold text-lg tracking-wide
                transition-all duration-300 ease-out
                ${
                  isLoggingIn
                    ? 'bg-emerald-600/50 text-emerald-200 cursor-wait'
                    : 'bg-gradient-to-r from-emerald-500 to-lime-500 text-white hover:shadow-lg hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98]'
                }
              `}
              onClick={onLoginClicked}
              disabled={isLoggingIn}
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

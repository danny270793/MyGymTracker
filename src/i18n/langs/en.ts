import type { Lang } from '.'

export const en: Lang = {
  helloWorld: 'hello world',
  notFound: 'not found',
  error: 'error',
  login: 'login',
  loginWelcome: 'welcome back',
  loginSubtitle: 'track your gains, crush your goals',
  loginButton: 'sign in',
  loggingIn: 'signing in...',
  loginFooter: 'your fitness journey starts here',
  // Form fields
  email: 'email',
  password: 'password',
  confirmPassword: 'confirm password',
  emailPlaceholder: 'enter your email',
  passwordPlaceholder: 'enter your password',
  confirmPasswordPlaceholder: 'confirm your password',
  // Validation errors
  emailRequired: 'email is required',
  emailInvalid: 'please enter a valid email',
  passwordRequired: 'password is required',
  passwordMinLength: 'password must be at least 6 characters',
  confirmPasswordRequired: 'please confirm your password',
  passwordsMustMatch: 'passwords must match',
  invalidCredentials: 'invalid email or password',
  emailAlreadyRegistered: 'this email is already registered',
  passwordTooWeak: 'password is too weak',
  // Register page
  register: 'register',
  registerWelcome: 'create account',
  registerSubtitle: 'start your fitness journey today',
  registerButton: 'create account',
  registering: 'creating account...',
  registerFooter: 'join thousands of athletes',
  noAccount: "don't have an account?",
  createAccount: 'create one',
  alreadyHaveAccount: 'already have an account?',
  backToLogin: 'sign in',
  // Register success
  registerSuccessTitle: 'check your email',
  registerSuccessMessage:
    "we've sent a confirmation link to your email address. please click the link to verify your account.",
  registerSuccessHint: 'after confirming, come back here to sign in',
  goToLogin: 'go to login',
  // Home page
  logout: 'logout',
  loggingOut: 'logging out...',
  // Sidebar
  muscles: 'muscles',
  // Loading states
  loading: 'loading...',
  noDataFound: 'no data found',
  errorLoadingData: 'error loading data',
  // Create muscle
  createMuscle: 'create muscle',
  muscleName: 'name',
  muscleNamePlaceholder: 'enter muscle name',
  muscleNameRequired: 'muscle name is required',
  creating: 'creating...',
  cancel: 'cancel',
  create: 'create',
}

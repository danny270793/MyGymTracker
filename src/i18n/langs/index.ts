export interface Lang {
  helloWorld: string
  notFound: string
  error: string
  login: string
  loginWelcome: string
  loginSubtitle: string
  loginButton: string
  loggingIn: string
  loginFooter: string
  // Form fields
  email: string
  password: string
  confirmPassword: string
  emailPlaceholder: string
  passwordPlaceholder: string
  confirmPasswordPlaceholder: string
  // Validation errors
  emailRequired: string
  emailInvalid: string
  passwordRequired: string
  passwordMinLength: string
  confirmPasswordRequired: string
  passwordsMustMatch: string
  invalidCredentials: string
  emailAlreadyRegistered: string
  passwordTooWeak: string
  // Register page
  register: string
  registerWelcome: string
  registerSubtitle: string
  registerButton: string
  registering: string
  registerFooter: string
  noAccount: string
  createAccount: string
  alreadyHaveAccount: string
  backToLogin: string
  // Register success
  registerSuccessTitle: string
  registerSuccessMessage: string
  registerSuccessHint: string
  goToLogin: string
  // Home page
  logout: string
  loggingOut: string
  // Sidebar
  muscles: string
  // Loading states
  loading: string
  noDataFound: string
  errorLoadingData: string
  // Create muscle
  createMuscle: string
  muscleName: string
  muscleNamePlaceholder: string
  muscleNameRequired: string
  creating: string
  cancel: string
  create: string
  // Edit muscle
  editMuscle: string
  updating: string
  save: string
  // Detail page
  back: string
  createdAt: string
  // Delete muscle
  deleteMuscle: string
  deleteConfirmTitle: string
  deleteConfirmMessage: string
  deleting: string
  delete: string
}

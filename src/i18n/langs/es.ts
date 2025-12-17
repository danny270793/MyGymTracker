import type { Lang } from '.'

export const es: Lang = {
  helloWorld: 'hola mundo',
  notFound: 'no encontrado',
  error: 'error',
  login: 'iniciar sesión',
  loginWelcome: 'bienvenido de nuevo',
  loginSubtitle: 'registra tus avances, alcanza tus metas',
  loginButton: 'iniciar sesión',
  loggingIn: 'iniciando sesión...',
  loginFooter: 'tu viaje fitness comienza aquí',
  // Form fields
  email: 'correo electrónico',
  password: 'contraseña',
  confirmPassword: 'confirmar contraseña',
  emailPlaceholder: 'ingresa tu correo',
  passwordPlaceholder: 'ingresa tu contraseña',
  confirmPasswordPlaceholder: 'confirma tu contraseña',
  // Validation errors
  emailRequired: 'el correo es requerido',
  emailInvalid: 'ingresa un correo válido',
  passwordRequired: 'la contraseña es requerida',
  passwordMinLength: 'la contraseña debe tener al menos 6 caracteres',
  confirmPasswordRequired: 'por favor confirma tu contraseña',
  passwordsMustMatch: 'las contraseñas deben coincidir',
  invalidCredentials: 'correo o contraseña inválidos',
  emailAlreadyRegistered: 'este correo ya está registrado',
  passwordTooWeak: 'la contraseña es muy débil',
  // Register page
  register: 'registrarse',
  registerWelcome: 'crear cuenta',
  registerSubtitle: 'comienza tu viaje fitness hoy',
  registerButton: 'crear cuenta',
  registering: 'creando cuenta...',
  registerFooter: 'únete a miles de atletas',
  noAccount: '¿no tienes una cuenta?',
  createAccount: 'crea una',
  alreadyHaveAccount: '¿ya tienes una cuenta?',
  backToLogin: 'iniciar sesión',
  // Register success
  registerSuccessTitle: 'revisa tu correo',
  registerSuccessMessage:
    'hemos enviado un enlace de confirmación a tu correo electrónico. por favor haz clic en el enlace para verificar tu cuenta.',
  registerSuccessHint: 'después de confirmar, vuelve aquí para iniciar sesión',
  goToLogin: 'ir al inicio de sesión',
  // Home page
  logout: 'cerrar sesión',
  loggingOut: 'cerrando sesión...',
  // Sidebar
  muscles: 'músculos',
  // Loading states
  loading: 'cargando...',
  noDataFound: 'no se encontraron datos',
  errorLoadingData: 'error al cargar datos',
  // Create muscle
  createMuscle: 'crear músculo',
  muscleName: 'nombre',
  muscleNamePlaceholder: 'ingresa el nombre del músculo',
  muscleNameRequired: 'el nombre del músculo es requerido',
  creating: 'creando...',
  cancel: 'cancelar',
  create: 'crear',
  // Edit muscle
  editMuscle: 'editar músculo',
  updating: 'actualizando...',
  save: 'guardar',
  // Detail page
  back: 'volver',
  createdAt: 'creado el',
  // Delete muscle
  deleteMuscle: 'eliminar músculo',
  deleteConfirmTitle: 'confirmar eliminación',
  deleteConfirmMessage: '¿estás seguro de que deseas eliminar este músculo? esta acción no se puede deshacer.',
  deleting: 'eliminando...',
  delete: 'eliminar',
  // Exercises
  exercises: 'ejercicios',
  noExercises: 'aún no hay ejercicios',
  createExercise: 'crear ejercicio',
  exerciseName: 'nombre',
  exerciseNamePlaceholder: 'ingresa el nombre del ejercicio',
  exerciseNameRequired: 'el nombre del ejercicio es requerido',
  editExercise: 'editar ejercicio',
}

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { en } from './langs/en'
import { es } from './langs/es'
import { capitalizeProcessor } from './post-processors/capitalize'
import { uppercaseProcessor } from './post-processors/uppercase'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(capitalizeProcessor)
  .use(uppercaseProcessor)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false,
    },
  })

export { i18n }

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'
import es from './locales/es.json'
import zh from './locales/zh.json'
import pt from './locales/pt.json'

// Base resources per language (can be split by namespace later)
const resources = {
  en: { translation: en },
  es: { translation: es },
  zh: { translation: zh },
  pt: { translation: pt },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
  supportedLngs: ['en', 'es', 'zh', 'pt'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  })

// Keep <html lang> in sync and allow global reactions to language changes
i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', lng)
    const rtlLangs = []
    document.documentElement.setAttribute('dir', rtlLangs.includes(lng) ? 'rtl' : 'ltr')
  }
})

export default i18n

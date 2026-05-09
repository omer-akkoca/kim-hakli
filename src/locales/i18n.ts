import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { en, tr } from './languages';

const i18n = createInstance();

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  lng: 'tr', // Localization.getLocales()[0]?.languageCode ?? 'tr',
  fallbackLng: 'tr',
  resources: {
    tr: { translation: tr },
    en: { translation: en },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

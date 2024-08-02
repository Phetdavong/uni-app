import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import la from '../../service/constantData/la.json'
import th from '../../service/constantData/th.json'
import en from '../../service/constantData/en.json'

export const languageResources = {
    la: {translation: la},
    th: {translation: th},
    en: {translation: en},
}

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en',
    resources: languageResources,
})

export default i18next
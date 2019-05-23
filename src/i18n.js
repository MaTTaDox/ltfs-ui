import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

i18n
    .use(XHR)
    .use(initReactI18next)
    .init({
        lng: 'de',
        fallbackLng: 'de',
        debug: false,
        react: {
            wait: false,
            bindI18n: 'languageChanged loaded',
            bindStore: 'added removed',
            nsMode: 'default'
        }
    });

export default i18n;
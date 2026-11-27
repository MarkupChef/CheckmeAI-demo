import common from '../../public/locales/en/common.json';

export const i18nOptions = {
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  resources: { en: { common } },
  interpolation: { escapeValue: false },
};

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { i18nOptions } from './config';

const i18n = i18next.createInstance();

i18n.use(initReactI18next).init(i18nOptions);

export default i18n;

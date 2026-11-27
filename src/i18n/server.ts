import i18next from 'i18next';
import { i18nOptions } from './config';

const i18n = i18next.createInstance();

i18n.init(i18nOptions);

export const t = i18n.t.bind(i18n);

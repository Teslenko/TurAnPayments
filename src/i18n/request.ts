import {getRequestConfig} from 'next-intl/server';
import {locales, defaultLocale} from './locales';

// Статическая таблица, чтобы сборщик и IDE видели реальные файлы
const LOADERS: Record<string, () => Promise<any>> = {
  en: () => import('../../messages/en.json'),
  ru: () => import('../../messages/ru.json'),
  uk: () => import('../../messages/uk.json'),
  tr: () => import('../../messages/tr.json'),
  fr: () => import('../../messages/fr.json'),
  es: () => import('../../messages/es.json'),
  de: () => import('../../messages/de.json')
};

export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale as any)) locale = defaultLocale;
  const messages = (await LOADERS[locale]()).default;
  return {messages};
});

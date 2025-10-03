export const locales = ['en', 'ru', 'uk', 'tr', 'fr', 'es', 'de'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'en';

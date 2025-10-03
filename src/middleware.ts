import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from './i18n/locales';

export default createMiddleware({locales, defaultLocale});
export const config = {
    matcher: ['/', '/(en|ru|uk|tr|fr|es|de)/:path*']
};

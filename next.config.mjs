// next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';

// Указываем путь к конфигу next-intl
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
};

export default withNextIntl(nextConfig);

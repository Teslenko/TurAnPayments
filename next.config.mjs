// next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Включаем экспорт в статик только когда явно попросим
const isPages = process.env.GHPAGES === '1';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  ...(isPages && {
    // нужно для GitHub Pages (статический сайт)
    output: 'export',
    images: { unoptimized: true },

    // т.к. репозиторий Teslenko/TurAnPayments, сайт живёт по под-пути /TurAnPayments
    basePath: '/TurAnPayments',
    assetPrefix: '/TurAnPayments/',
  }),
};

export default withNextIntl(nextConfig);

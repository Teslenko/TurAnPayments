/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://turanpayments.com',   // ← сюда ставь свой домен
    generateRobotsTxt: true,
    sitemapSize: 7000,  // можно оставить дефолт
    changefreq: 'weekly',
    priority: 0.7
};

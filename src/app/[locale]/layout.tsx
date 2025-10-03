// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';
import { locales } from '@/i18n/locales';

// статический список параметров для экспорта (требование Next.js при output: 'export')
export const dynamicParams = false;
export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

async function getMessages(locale: string) {
    try {
        // если у тебя messages лежат в src/messages/*.json — этот путь корректен
        return (await import(`../../../messages/${locale}.json`)).default;
    } catch {
        return (await import(`../../../messages/en.json`)).default;
    }
}

export default async function LocaleLayout({
                                               children,
                                               params: { locale },
                                           }: {
    children: ReactNode;
    params: { locale: string };
}) {
    const messages = await getMessages(locale);

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
}

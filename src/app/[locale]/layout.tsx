import {NextIntlClientProvider} from 'next-intl';

async function getMessages(locale: string) {
    try {
        return (await import(`../../../messages/${locale}.json`)).default;
    } catch {

        return (await import(`../../../messages/en.json`)).default;
    }
}

export default async function LocaleLayout({
                                               children, params: {locale}
                                           }: {children: React.ReactNode; params:{locale:string}}) {
    const messages = await getMessages(locale);

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
}

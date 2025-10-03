'use client';

import Link from 'next/link';
import {useTranslations} from 'next-intl';

export default function Navbar() {
    const t = useTranslations('navbar');

    return (
        <nav className="flex gap-6 items-center p-4 border-b">
            <span className="font-bold">{t('brand') ?? 'YourPay'}</span>

            <Link href="/products">{t('products')}</Link>
            <Link href="/solutions">{t('solutions')}</Link>
            <Link href="/currencies">{t('currencies')}</Link>
            <Link href="/docs">{t('docs')}</Link>
            <Link href="/help">{t('help')}</Link>
            <Link href="/dashboard">{t('dashboard')}</Link>
        </nav>
    );
}

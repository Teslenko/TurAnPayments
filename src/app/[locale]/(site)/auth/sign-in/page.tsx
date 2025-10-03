'use client';

import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {useState} from 'react';

export default function SignInPage() {
    const t = useTranslations('auth');
    const locale = useLocale();
    const prefix = `/${locale}`;
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErr(null); setLoading(true);
        const form = new FormData(e.currentTarget);
        const res = await fetch('/api/auth/sign-in', {
            method: 'POST',
            body: JSON.stringify({
                email: form.get('email'),
                password: form.get('password')
            }),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        setLoading(false);
        if (!res.ok) return setErr(data.message || 'Error');
        // TODO: заменить на реальный редирект после сессии
        window.location.href = `${prefix}/dashboard`;
    }

    return (
        <main className="min-h-[70vh] grid place-items-center px-4">
            <form onSubmit={onSubmit}
                  className="w-full max-w-md rounded-2xl border bg-white dark:bg-zinc-900 p-6 shadow-sm">
                <h1 className="text-2xl font-semibold mb-1">{t('signInTitle')}</h1>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-6">{t('welcomeBack')}</p>

                <label className="block text-sm mb-1">{t('email')}</label>
                <input name="email" type="email" required
                       className="input mb-4 w-full" placeholder="you@email.com"/>

                <div className="flex items-center justify-between">
                    <label className="block text-sm mb-1">{t('password')}</label>
                    <Link href={`${prefix}/auth/forgot`} className="text-xs text-zinc-600 dark:text-zinc-300 hover:underline">
                        {t('forgot')}
                    </Link>
                </div>
                <input name="password" type="password" required minLength={6}
                       className="input mb-4 w-full" placeholder="••••••••"/>

                {err && <div className="text-sm text-red-600 mb-3">{err}</div>}

                <button disabled={loading} className="btn btn-primary w-full">
                    {loading ? t('loading') : t('signIn')}
                </button>

                <div className="text-sm text-zinc-600 dark:text-zinc-300 mt-4">
                    {t('noAccount')}{' '}
                    <Link href={`${prefix}/auth/sign-up`} className="hover:underline">
                        {t('createOne')}
                    </Link>
                </div>
            </form>
        </main>
    );
}

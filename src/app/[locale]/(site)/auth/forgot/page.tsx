'use client';

import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {useState} from 'react';

export default function ForgotPage() {
    const t = useTranslations('auth');
    const locale = useLocale();
    const prefix = `/${locale}`;
    const [sent, setSent] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErr(null);
        const form = new FormData(e.currentTarget);
        const res = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email: form.get('email') }),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        if (!res.ok) return setErr(data.message || 'Error');
        setSent(true);
    }

    return (
        <main className="min-h-[70vh] grid place-items-center px-4">
            <form onSubmit={onSubmit}
                  className="w-full max-w-md rounded-2xl border bg-white dark:bg-zinc-900 p-6 shadow-sm">
                <h1 className="text-2xl font-semibold mb-1">{t('resetTitle')}</h1>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-6">{t('resetDesc')}</p>

                {!sent ? (
                    <>
                        <label className="block text-sm mb-1">{t('email')}</label>
                        <input name="email" type="email" required className="input mb-4 w-full" placeholder="you@email.com"/>
                        {err && <div className="text-sm text-red-600 mb-3">{err}</div>}
                        <button className="btn btn-primary w-full">{t('sendLink')}</button>
                    </>
                ) : (
                    <div className="text-sm text-emerald-600">{t('resetSent')}</div>
                )}

                <div className="text-sm text-zinc-600 dark:text-zinc-300 mt-4">
                    <Link href={`${prefix}/auth/sign-in`} className="hover:underline">
                        {t('backToSignIn')}
                    </Link>
                </div>
            </form>
        </main>
    );
}

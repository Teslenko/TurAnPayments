"use client";
import {useLocale} from 'next-intl';
import {usePathname, useRouter} from 'next/navigation';
import {locales} from '@/i18n/locales';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    const parts = pathname.split('/').filter(Boolean);
    parts[0] = next;
    router.push('/' + parts.join('/'));
  }

  return (
    <select value={locale} onChange={onChange} className="border rounded-md px-2 py-1 text-sm">
      {locales.map((l) => <option key={l} value={l}>{l.toUpperCase()}</option>)}
    </select>
  );
}

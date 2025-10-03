'use client';

import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {cn} from '@/lib/utils';

type Item = {label: string; href: string; icon?: React.ReactNode; note?: string};
type Section = {title?: string; items: Item[]};

export default function Dropdown({
                                     label,
                                     sections,
                                     align = 'left'
                                 }: {
    label: string;
    sections: Section[];
    align?: 'left' | 'right';
}) {
    const [open, setOpen] = useState(false);
    const btnRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearClose = () => {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
    };

    const scheduleClose = () => {
        clearClose();
        closeTimer.current = setTimeout(() => setOpen(false), 20); // 👈 небольшая задержка
    };

    // открытие — при наведении и фокусе
    const openMenu = () => {
        clearClose();
        setOpen(true);
    };

    // закрытие по клику вне и Esc
    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (!panelRef.current || !btnRef.current) return;
            const t = e.target as Node;
            if (panelRef.current.contains(t) || btnRef.current.contains(t)) return;
            setOpen(false);
        }
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') setOpen(false);
        }
        document.addEventListener('mousedown', onDocClick);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onDocClick);
            document.removeEventListener('keydown', onKey);
        };
    }, []);

    return (
        <div className="relative">
            <button
                ref={btnRef}
                onClick={() => (open ? setOpen(false) : setOpen(true))}
                onMouseEnter={openMenu}
                onMouseLeave={scheduleClose}
                onFocus={openMenu}
                onBlur={scheduleClose}
                aria-expanded={open}
                className={cn(
                    'rounded-lg px-3 py-2 text-sm hover:bg-zinc-100 dark:bg-zinc-800/50 flex items-center gap-1',
                    open && 'bg-zinc-100 dark:bg-zinc-800/50'
                )}
            >
                {label}
                <span className={cn('transition-transform text-zinc-500', open ? 'rotate-180' : '')}>▾</span>
            </button>

            {open && (
                <div
                    ref={panelRef}
                    // держим меню открытым, пока мышь на панели
                    onMouseEnter={openMenu}
                    onMouseLeave={scheduleClose}
                    className={cn(
                        'absolute z-50 mt-2 w-[540px] rounded-2xl border bg-white dark:bg-zinc-900 shadow-xl p-3',
                        align === 'right' ? 'right-0' : 'left-0'
                    )}
                    role="menu"
                >
                    <div className="grid grid-cols-2 gap-3">
                        {sections.map((sec, si) => (
                            <div key={si} className="space-y-1">
                                {sec.title && (
                                    <div className="px-2 pt-2 text-xs uppercase tracking-wide text-zinc-500">
                                        {sec.title}
                                    </div>
                                )}
                                {sec.items.map((it) => (
                                    <Link
                                        key={it.href + it.label}
                                        href={it.href}
                                        className="flex items-start gap-3 rounded-xl px-2 py-2 hover:bg-zinc-50 focus:bg-zinc-50 outline-none"
                                        role="menuitem"
                                    >
                                        <div className="text-xl leading-none">{it.icon ?? '•'}</div>
                                        <div>
                                            <div className="text-sm font-medium">{it.label}</div>
                                            {it.note && <div className="text-xs text-zinc-500">{it.note}</div>}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

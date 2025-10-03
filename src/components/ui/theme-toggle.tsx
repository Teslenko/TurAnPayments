'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null; // чтобы не было гидрации

    const current = theme === 'system' ? systemTheme : theme;
    const isDark = current === 'dark';

    return (
        <button
            className="btn btn-outline"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label="Toggle theme"
            title={isDark ? 'Switch to light' : 'Switch to dark'}
        >
            {isDark ? '🌙 Dark' : '☀️ Light'}
        </button>
    );
}

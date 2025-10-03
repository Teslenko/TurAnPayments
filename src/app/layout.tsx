// src/app/layout.tsx
import type { Metadata } from 'next';
import ThemeProvider from '@/components/theme-provider';

export const metadata: Metadata = {
    title: 'TuranPayments — Crypto payment gateway',
    description: 'Accept crypto via invoices, buttons, widgets and API.'
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
        <body>
        <ThemeProvider>
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
